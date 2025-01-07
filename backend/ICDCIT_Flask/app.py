import PyPDF2
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit
import uuid
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from urllib.parse import urlparse
import PyPDF2
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# In-memory data for rooms and chats (Replace this with database integration)
rooms = {}
chats = {}
MEDICAL_ASSISTANT_PROMPT = """You are a helpful medical assistant. 
You have access to the following medical document text (and prior conversation). 
Use this information to answer the user's question accurately and concisely.
If you do not find relevant context or the question is out of scope (e.g., about celebrities), 
politely respond with a refusal, stating you lack sufficient information.

- Provide references in the format: [chunk index]
- Provide disclaimers when offering medical-related information.
- Be succinct and factual.

Context:
{context}

Conversation History:
{chat_history}

User's Question:
{question}

Helpful Answer (include references if relevant):
"""
groq_api_key = "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"
PDF_PATH = "data/MEDICAL_PDF.pdf"
prompt_template = PromptTemplate(
    input_variables=["context", "chat_history", "question"],
    template=MEDICAL_ASSISTANT_PROMPT
)

groq_llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key=groq_api_key
)


def getModelChain():
    pdf_reader = PyPDF2.PdfReader(PDF_PATH)
    pdf_text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text() or ""
        pdf_text += page_text

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150
    )
    chunks = text_splitter.split_text(pdf_text)

    metadatas = [{"source": f"chunk_{i}"} for i in range(len(chunks))]

    # FAISS vector store
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={'device': "cpu"}
    )
    vectorstore = FAISS.from_texts(chunks, embeddings, metadatas=metadatas)

    message_history = ChatMessageHistory()
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        chat_memory=message_history,
        return_messages=True,
        output_key="answer"
    )

    chain = ConversationalRetrievalChain.from_llm(
        llm=groq_llm,
        retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
        memory=memory,
        combine_docs_chain_kwargs={
            "prompt": prompt_template
        },
        return_source_documents=True
    )
    print("Medical PDF loaded successfully. Ask your questions below!")
    return chain


modelChain = getModelChain()

# Dummy ML model function
def generate_title():
    return "Chat Room Title"


def process_command(command):
    # Placeholder for ML model response
    return f"Processed response for command: {command}"


@app.route('/create-room', methods=['POST'])
def create_room():
    data = request.json
    title = generate_title()  # Call your ML model here to generate a title
    room_id = str(uuid.uuid4())
    rooms[room_id] = {
        'title': title,
        'users': []
    }
    return jsonify({'room_id': room_id, 'title': title})


@app.route('/get-rooms', methods=['GET'])
def get_rooms():
    return jsonify(rooms)


@socketio.on('join')
def handle_join(data):
    username = data['username']
    room_id = data['room_id']
    if room_id in rooms:
        join_room(room_id)
        rooms[room_id]['users'].append(username)
        emit('user_joined', {'username': username, 'room_id': room_id}, room_id)
    else:
        emit('error', {'message': 'Room does not exist'})


@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room_id = data['room_id']
    if room_id in rooms:
        leave_room(room_id)
        rooms[room_id]['users'].remove(username)
        emit('user_left', {'username': username, 'room_id': room_id}, room_id)
    else:
        emit('error', {'message': 'Room does not exist'})


@socketio.on('message')
def handle_message(data):
    room_id = data['room_id']
    username = data['username']
    message = data['message']

    # Check if it's a command
    if message.startswith('/bot'):
        response = process_command(message)
        emit('bot_response', {'username': 'Bot', 'message': response}, room_id)
    else:
        # Broadcast message to the room
        emit('message', {'username': username, 'message': message}, room_id)

    # Save message to in-memory store (replace with database integration)
    if room_id not in chats:
        chats[room_id] = []
    chats[room_id].append({'username': username, 'message': message})


@app.route('/get-chats/<room_id>', methods=['GET'])
def get_chats(room_id):
    if room_id in chats:
        return jsonify(chats[room_id])
    return jsonify({'error': 'Room not found'}), 404
def get_answer_from_model(question):
    if question:
        response = modelChain.invoke(question)
        print("response", response)
        answer = response["answer"]
        return f"{answer}"


DATABASE_URL = os.getenv('DATABASE_URL')
url = urlparse(DATABASE_URL)

def update_chatbot_room(chatBotRoomId, message, messageType):
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    insert_query = """
    INSERT INTO chatbot_message (chatbot_message, message_type, chatbot_room_id)
    VALUES (%s, %s, %s)
    """
    cursor.execute(insert_query, (message, messageType, chatBotRoomId))
    conn.commit()
    cursor.close()
    conn.close()

def update_room_title(chatBotRoomId):
    conn = psycopg2.connect(
        dbname=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    select_query = "SELECT title FROM chatbot_room WHERE chatbot_room_id = %s"
    cursor.execute(select_query, (chatBotRoomId,))
    result = cursor.fetchone()
    if result and result['title']:
        cursor.close()
        conn.close()
        return  # Title already set, do not update

    title = generate_title()
    update_query = """
    UPDATE chatbot_room
    SET title = %s
    WHERE chatbot_room_id = %s
    """
    cursor.execute(update_query, (title, chatBotRoomId))
    conn.commit()
    cursor.close()
    conn.close()

@app.route('/question-answer', methods=['POST'])
def question_answer():
    data = request.json
    message = data.get('message')
    messageType = "Incoming"
    chatBotRoomId = data.get('chatBotRoomId')

    if not message or not messageType or not chatBotRoomId:
        return jsonify({'error': 'message, messageType, and chatBotRoomId are required'}), 400

    update_chatbot_room(chatBotRoomId, message, messageType)
    update_room_title(chatBotRoomId)

    answer = get_answer_from_model(message)
    update_chatbot_room(chatBotRoomId, answer, "Outgoing")
    return jsonify({'messageType': "Incoming", 'message': answer, 'chatBotRoomId': chatBotRoomId})


if __name__ == '__main__':
    socketio.run(app, debug=True)

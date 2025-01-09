import PyPDF2
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

from utils.database_queries import get_all_proficiencies

MEDICAL_ASSISTANT_PROMPT = """You will be provided with a list of medical proficiencies and a user related medical query or symptom.
You have to provide the most relevant proficiency from the list to the user query or symptom.

Your answer must not include any message, except the proficiency name separated by commas with no space in between. Ex: "Proficiency1,Proficiency2"

Proficiencies:
{context}

Conversation History:
{chat_history}

User's Question:
{question}
"""
groq_api_key = "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"
prompt_template = PromptTemplate(
    input_variables=["context", "question"],
    template=MEDICAL_ASSISTANT_PROMPT
)

groq_llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key=groq_api_key
)


def getModelChain():
    text = "\n".join(get_all_proficiencies())

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150
    )
    chunks = text_splitter.split_text(text)

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
        combine_docs_chain_kwargs={
            "prompt": prompt_template
        },
        memory=memory,
        return_source_documents=True
    )
    print("Proficiencies loaded successfully. Ask your questions below!")
    return chain


modelChain = getModelChain()

def get_answer_from_model(question):
    if question:
        print(question)
        response = modelChain.invoke(question)
        print("response", response)
        answer = response["answer"]
        return f"{answer}".split(',')
def generate_title():
    return "Chat Room Title"

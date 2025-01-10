import PyPDF2
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq

from utils.model_updater import fetch_all_news

MEDICAL_ASSISTANT_PROMPT = """You are a helpful medical assistant. 
You have access to the following medical document text (and prior conversation). 
You also have access to updated health and diseases news articles.
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
    news_data = fetch_all_news()
    print("News data fetched successfully.", news_data)
    pdf_text += "\n NEWS: " + news_data
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

def get_answer_from_model(question):
    if question:
        response = modelChain.invoke(question)
        print("response", response)
        answer = response["answer"]
        return f"{answer}"
# Dummy ML model function
def generate_title():
    return "Chat Room Title"

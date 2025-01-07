import os
import streamlit as st
import PyPDF2
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from rouge import Rouge
from dotenv import load_dotenv

load_dotenv()
groq_api_key = "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"


def calculate_rouge_scores(reference: str, hypothesis: str):
    # relevancy checl
    rouge = Rouge()
    scores = rouge.get_scores(hypothesis, reference, avg=True)
    return scores


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

prompt_template = PromptTemplate(
    input_variables=["context", "chat_history", "question"],
    template=MEDICAL_ASSISTANT_PROMPT
)

groq_llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key=groq_api_key
)

st.set_page_config(page_title="Medical Helper Agent", layout="wide")
st.title("Medical Helper Agen")

st.sidebar.title("Medical Helper")
st.sidebar.markdown("""
**Description**:
- Just ask your medical questions below—no need to upload anything.
""")

PDF_PATH = "data/MEDICAL_PDF.pdf"

if not os.path.exists(PDF_PATH):
    st.error("The file `MEDICAL_PDF.pdf'")
else:
    with st.spinner("Loading the pre-provided PDF ..."):
        print("Loading PDF...")
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

    st.success("Medical PDF loaded successfully. Ask your questions below!")

    user_query = st.text_input("Enter your medical question here:")

    if user_query:
        response = chain.invoke(user_query)
        print("response", response)
        answer = response["answer"]
        source_docs = response["source_documents"]

        st.markdown(f"**Answer:** {answer}")

        # citation
        if source_docs:
            st.write("**Retrieved Sources (Chunks):**")
            for i, src_doc in enumerate(source_docs):
                with st.expander(f"Chunk {i} - {src_doc.metadata.get('source')}"):
                    st.write(src_doc.page_content)
        else:
            st.write("No relevant chunks retrieved.")

        rouge_scores = calculate_rouge_scores(pdf_text, answer)
        st.subheader("ROUGE Scores (for internal reference)")
        st.write(f"ROUGE-1 F1: {rouge_scores['rouge-1']['f']:.4f}")
        st.write(f"ROUGE-2 F1: {rouge_scores['rouge-2']['f']:.4f}")
        st.write(f"ROUGE-L F1: {rouge_scores['rouge-l']['f']:.4f}")

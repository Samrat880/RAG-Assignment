import 'dotenv/config'
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";



async function inti() {
    const pdfFilePath = "./TSLA-Q2-2025-update.pdf"
    const loader = new PDFLoader(pdfFilePath);
    // page by page load the PDF file
    const docs = await loader.load();


    // Ready the client OpenAI Embedding model
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    const vetorStore = await QdrantVectorStore.fromDocuments(docs,embeddings,
        {url: 'http://localhost:6333',
            collectionName: 'Tesla-collection'

        })

    console.log("Indexing of the Documents....")
}

inti()
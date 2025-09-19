import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import 'dotenv/config'

const client  = new OpenAI();

async function chat() {
  const userQuery = 'Buy Tesla Stock for next quater will be profitbale or not?';

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  })

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
        url: 'http://localhost:6333',
        collectionName: 'Tesla-collection'
    }
  )

 const vectorSearcher =  vectorStore.asRetriever({
    k: 3
  })

  const relevantChunks = await vectorSearcher.invoke(userQuery);

  const SYSTEM_PROMPT = `You are a helpful AI assistant with Senior Financial Analyst Who Knows Everything About Markets. Use the following pieces of context to answer the question at the end. if you don't know the answer, just say that you don't know , don't try to make up an answer.

  Context: ${JSON.stringify(relevantChunks)} `;


  const response = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
        {role: 'system', content: SYSTEM_PROMPT},
        {role: 'user', content: userQuery}
    ]
  })


  console.log(`> ${response.choices[0].message.content}`)

}

chat();
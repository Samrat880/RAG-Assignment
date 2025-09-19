# RAG (Retrieval-Augmented Generation) Project

This project demonstrates a simple Retrieval-Augmented Generation (RAG) pipeline using Node.js, LangChain, OpenAI, and Qdrant. The goal is to index PDF documents, store their embeddings in a vector database (Qdrant), and perform semantic search and question answering over the indexed content.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Code Explanation](#code-explanation)
  - [indexing.js](#indexingjs)
  - [query.js](#queryjs)
- [Docker Compose](#docker-compose)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Structure

```
rag/
├── .env
├── .gitignore
├── docker-compose.yml
├── indexing.js
├── query.js
├── package.json
├── package-lock.json
└── (PDF files to index)
```

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Samrat880/RAG-Assignment.git
   cd rag
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `rag` directory.

4. **Start Qdrant (Vector Database) using Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Add your PDF files** to the `rag` directory or specify their path in `indexing.js`.

6. **Index your documents:**
   ```bash
   node indexing.js
   ```

7. **Query your documents:**
   ```bash
   node query.js
   ```

---

## Environment Variables

Create a `.env` file in the `rag` directory with the following content:

```
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_URL=http://localhost:6333
```

- `OPENAI_API_KEY`: Your OpenAI API key for embedding and language model calls.
- `QDRANT_URL`: URL for your local Qdrant instance (default: `http://localhost:6333`).

---

## Code Explanation

### indexing.js

This script reads PDF files, splits them into chunks, generates embeddings using OpenAI, and stores them in Qdrant.

**Key Steps:**
1. **Load Environment Variables:**  
   Uses `dotenv` to load API keys and configuration.

2. **Read PDF Files:**  
   Uses `pdf-parse` to extract text from PDF files.

3. **Chunk Text:**  
   Splits the extracted text into manageable chunks for embedding.

4. **Generate Embeddings:**  
   Uses OpenAI's embedding API (via LangChain) to convert text chunks into vector representations.

5. **Store in Qdrant:**  
   Connects to Qdrant and stores each chunk's embedding with metadata (e.g., file name, chunk index).

**Example Code Snippet:**
```js
// Load environment variables
require('dotenv').config();

// Read and parse PDF
const pdf = require('pdf-parse');
const fs = require('fs');
const dataBuffer = fs.readFileSync('yourfile.pdf');
const data = await pdf(dataBuffer);

// Chunk text and generate embeddings
// ... (chunking logic)
// ... (embedding logic)

// Store in Qdrant
// ... (Qdrant client logic)
```

---

### query.js

This script allows you to query the indexed documents using natural language.

**Key Steps:**
1. **Load Environment Variables:**  
   Loads API keys and configuration.

2. **Accept User Query:**  
   Takes a question from the user (via command line or hardcoded).

3. **Generate Query Embedding:**  
   Converts the user query into an embedding using OpenAI.

4. **Search Qdrant:**  
   Finds the most similar document chunks in Qdrant.

5. **Generate Answer:**  
   Uses OpenAI's language model to generate an answer based on the retrieved chunks.

**Example Code Snippet:**
```js
// Load environment variables
require('dotenv').config();

// Accept user query
const query = "What is the main topic of the document?";

// Generate embedding and search Qdrant
// ... (embedding and search logic)

// Generate answer using OpenAI
// ... (completion logic)
```

---

## Docker Compose

The `docker-compose.yml` file is used to run Qdrant locally:

```yaml
version: "3.8"
services:
  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
```

Start Qdrant with:
```bash
docker-compose up -d
```

---

## How It Works

1. **Indexing:**  
   - PDF files are read and split into chunks.
   - Each chunk is embedded using OpenAI and stored in Qdrant with metadata.

2. **Querying:**  
   - User submits a question.
   - The question is embedded and used to search for similar chunks in Qdrant.
   - The most relevant chunks are passed to OpenAI's language model to generate a final answer.

---

## Troubleshooting

- **Missing API Key:**  
  Ensure your `.env` file contains a valid `OPENAI_API_KEY`.

- **Qdrant Connection Issues:**  
  Make sure Qdrant is running (`docker-compose up -d`) and `QDRANT_URL` is correct.

- **Dependency Conflicts:**  
  If you see npm errors, try installing with `--legacy-peer-deps`:
  ```bash
  npm install --legacy-peer-deps
  ```

- **node_modules in Git:**  
  If `node_modules` was accidentally committed, remove it:
  ```bash
  git rm -r --cached node_modules
  git commit -m "Remove node_modules from repo"
  git push
  ```

---

## License

This project is for educational purposes.

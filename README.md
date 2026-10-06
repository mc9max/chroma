# Chroma — Vector Database

Open-source data infrastructure for AI. Store embeddings with metadata, search with dense vectors, filter by metadata, and retrieve across text, images, and more — through a tiny 4-function API.

## Deploy and Host

Host your own Chroma instance on Railway. This template provisions the official Chroma server image (v1.5.9) with persistent storage for collections and embeddings.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/chroma-1)

## Why Deploy

Chroma is the open-source vector database behind thousands of RAG pipelines, AI agents, and semantic-search apps (29k+ GitHub stars). Running it on Railway gives you a durable, globally reachable instance with:

- **Persistent collections** — embeddings survive restarts on a Railway volume
- **Tiny 4-function API** — collections, add, query, get; clients for Python, JS, Rust, Go
- **No external dependencies** — single container, embedded SQLite, fast startup
- **Metadata filtering** — filter results at query time by any metadata condition
- **Production-ready** — powers retrieval for agents, copilots, and search products

## Common Use Cases

- **RAG pipelines** — power retrieval-augmented generation with your own embeddings
- **Semantic search** — build search engines that understand meaning, not just keywords
- **AI agents** — give your LLM agents long-term memory via vector storage
- **Recommendation systems** — find similar products, content, or users
- **Code search** — index codebases to power coding agents

### Deployment Dependencies

The deploy form pre-fills all required variables. No additional services needed — Chroma runs as a single container with a volume for persistent storage.

**After the first successful deploy:**

1. Check health: `curl https://YOUR-DOMAIN.up.railway.app/api/v2/heartbeat` → `{"nanosecond heartbeat":...}`
2. Check version: `curl https://YOUR-DOMAIN.up.railway.app/api/v2/version` → `"1.0.0"`

## About Hosting

Chroma runs as a single container on Railway from the official `ghcr.io/chroma-core/chroma` image (pinned to v1.5.9). Vector data persists on a Railway volume mounted at `/data` (the image's baked-in `/config.yaml` sets `persist_path: "/data"`). The server listens on port 8000 and exposes a REST API. Railway healthchecks `/api/v2/heartbeat` before routing traffic.

## Features

- **Vector search** — dense similarity search with HNSW indexing
- **Metadata filtering** — filter results at query time by metadata conditions
- **Multi-modal retrieval** — index and search images and other modalities alongside text
- **Full-text search** — keyword search over documents without embeddings
- **REST API** — official clients for Python, JavaScript, Rust, and Go
- **Single container** — no Postgres, no Redis, nothing else to run

## Dependencies for

- **No external services required** — Chroma runs standalone
- **Optional: embedding model** — bring your own embeddings (OpenAI, Cohere, Hugging Face, sentence-transformers) or let Chroma embed documents automatically

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP API port. Railway maps this to the public domain. | `8000` |
| `IS_PERSISTENT` | Persist the embedded database to the `/data` volume. Keep `TRUE`. | `TRUE` |
| `ANONYMIZED_TELEMETRY` | Disable anonymous product telemetry. | `FALSE` |

## Volumes

| Mount | Purpose |
|-------|---------|
| `/data` | Embedded database (`chroma.sqlite3`) plus segment storage. Do not remove. |

## Quick Start

After deployment, the Chroma server is ready at your Railway public domain:

```bash
# Check server health
curl https://YOUR-DOMAIN.up.railway.app/api/v2/heartbeat

# List collections
curl https://YOUR-DOMAIN.up.railway.app/api/v2/tenants/default_tenant/databases/default_database/collections

# Create a collection
curl -X POST https://YOUR-DOMAIN.up.railway.app/api/v2/tenants/default_tenant/databases/default_database/collections \
  -H 'Content-Type: application/json' \
  -d '{"name":"my_collection"}'

# Python client
pip install chromadb
```

```python
import chromadb
client = chromadb.HttpClient(host="YOUR-DOMAIN.up.railway.app", port=443, ssl=True)
collection = client.get_or_create_collection("my_collection")
collection.add(documents=["This is document1", "This is document2"], ids=["doc1", "doc2"])
results = collection.query(query_texts=["This is a query document"], n_results=2)
```

## License

Chroma is licensed under the Apache License 2.0. See the [Chroma GitHub repository](https://github.com/chroma-core/chroma) for details.

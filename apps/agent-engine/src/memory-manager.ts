import { OpenAIEmbeddings } from "@langchain/openai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { PrismaClient } from '@mcpserver/db';
const prisma = new PrismaClient();
export class MemoryManager {
  private embeddings: OpenAIEmbeddings;
  constructor() {
    this.embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });
  }
  async createNamespace(namespace: string) {
    console.log(`Initializing vector store namespace: ${namespace}`);
  }
  async saveMemory(agentId: string, userId: string, content: string, category: string) {
    const memory = await prisma.memory.create({ data: { agentId, userId, content, category: category as any } });
    const vectorStore = await PGVectorStore.initialize(this.embeddings, {
      postgresConnectionOptions: { connectionString: process.env.VECTOR_DB_URL! },
      tableName: "memories",
      columns: {
        idColumnName: "id",
        vectorColumnName: "embedding",
        contentColumnName: "content",
        metadataColumnName: "metadata",
      },
    });
    await vectorStore.addDocuments([
      {
        pageContent: content,
        metadata: { memoryId: memory.id, agentId, userId, category },
      },
    ]);
    return memory;
  }
  async retrieveRelevantMemories(agentId: string, userId: string, query: string, limit = 5) {
    const vectorStore = await PGVectorStore.initialize(this.embeddings, {
      postgresConnectionOptions: { connectionString: process.env.VECTOR_DB_URL! },
      tableName: "memories",
      columns: {
        idColumnName: "id",
        vectorColumnName: "embedding",
        contentColumnName: "content",
        metadataColumnName: "metadata",
      },
    });
    const results = await vectorStore.similaritySearch(query, limit, { agentId, userId });
    return results.map(r => ({ content: r.pageContent, metadata: r.metadata }));
  }
}

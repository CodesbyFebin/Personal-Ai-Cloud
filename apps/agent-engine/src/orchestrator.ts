import { ChatOpenAI } from "@langchain/openai";
import { MemoryManager } from "./memory-manager";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { PdfParser, VoiceParser } from "./parsers";

export class Orchestrator {
  private llm: ChatOpenAI;
  private memoryManager: MemoryManager;
  private pdfParser: PdfParser;
  private voiceParser: VoiceParser;
  constructor() {
    this.llm = new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0.7, apiKey: process.env.OPENAI_API_KEY });
    this.memoryManager = new MemoryManager();
    this.pdfParser = new PdfParser();
    this.voiceParser = new VoiceParser();
  }
  async generateResponse(agentId: string, userId: string, message: string) {
    const memories = await this.memoryManager.retrieveRelevantMemories(agentId, userId, message, 5);
    const context = memories.map(m => m.content).join("\n");
    const systemPrompt = "You are a helpful personal AI assistant. Use the provided context to answer.";
    const prompt = PromptTemplate.fromTemplate(`
      System: {systemPrompt}
      Context: {context}
      User: {message}
      Assistant:
    `);
    const chain = RunnableSequence.from([prompt, this.llm, new StringOutputParser()]);
    const response = await chain.invoke({
      systemPrompt,
      context: context || "No relevant memories found.",
      message,
    });
    return response;
  }
  async parsePdf(buffer: Buffer): Promise<string> {
    const text = await this.pdfParser.parse(buffer);
    const chunks = await this.pdfParser.chunkText(text);
    return chunks.join('\n\n');
  }
  async parseVoice(buffer: Buffer, mimeType: string): Promise<string> {
    return this.voiceParser.transcribe(buffer, mimeType);
  }
}

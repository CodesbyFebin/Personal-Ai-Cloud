import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

export class PdfParser {
  async parse(buffer: Buffer): Promise<string> {
    const data = await (pdfParse as any)(buffer);
    return data.text;
  }

  async parseFile(filePath: string): Promise<string> {
    const buffer = await fs.readFile(filePath);
    return this.parse(buffer);
  }

  async chunkText(text: string, chunkSize = 1000, overlap = 200): Promise<string[]> {
    const chunks: string[] = [];
    const words = text.split(/\s+/);
    let currentChunk = '';

    for (const word of words) {
      if ((currentChunk + ' ' + word).length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = word;
      } else {
        currentChunk += ' ' + word;
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }
}

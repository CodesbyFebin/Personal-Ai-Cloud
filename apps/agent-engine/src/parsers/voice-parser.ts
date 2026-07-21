import OpenAI from 'openai';

export class VoiceParser {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  async transcribe(buffer: Buffer, mimeType: string): Promise<string> {
    const blob = new Blob([buffer.buffer as ArrayBuffer], { type: mimeType });
    const file = new File([blob], 'audio.mp3', { type: mimeType });
    const transcription = await this.openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    });
    return transcription.text;
  }
  async transcribeFile(filePath: string, mimeType: string): Promise<string> {
    const buffer = await require('fs/promises').readFile(filePath);
    return this.transcribe(buffer, mimeType);
  }
}

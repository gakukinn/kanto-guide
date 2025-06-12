import { getGeminiModel } from '../config/gemini-config';

export class GeminiHelper {
  private static model = getGeminiModel();

  // 生成文本
  static async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini text generation error:', error);
      throw error;
    }
  }

  // 生成结构化数据
  static async generateStructuredData<T>(
    prompt: string,
    schema: Record<string, any>
  ): Promise<T> {
    try {
      const structuredPrompt = `
        ${prompt}
        请按照以下JSON格式返回数据：
        ${JSON.stringify(schema, null, 2)}
      `;
      
      const result = await this.model.generateContent(structuredPrompt);
      const response = await result.response;
      return JSON.parse(response.text()) as T;
    } catch (error) {
      console.error('Gemini structured data generation error:', error);
      throw error;
    }
  }

  // 生成多轮对话
  static async chat(messages: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const chat = this.model.startChat({
        history: messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(messages[messages.length - 1].content);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini chat error:', error);
      throw error;
    }
  }
} 
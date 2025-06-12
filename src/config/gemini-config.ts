import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini模型配置
export const geminiConfig = {
  model: 'gemini-2.5-pro',
  apiKey: process.env.GOOGLE_AI_API_KEY || '',
  temperature: 0.7,
  maxOutputTokens: 2048,
  topP: 0.8,
  topK: 40,
};

// 初始化Gemini客户端
export const initGemini = () => {
  if (!geminiConfig.apiKey) {
    throw new Error('GOOGLE_AI_API_KEY is not set in environment variables');
  }
  
  return new GoogleGenerativeAI(geminiConfig.apiKey);
};

// 获取Gemini模型实例
export const getGeminiModel = () => {
  const genAI = initGemini();
  return genAI.getGenerativeModel({
    model: geminiConfig.model,
    generationConfig: {
      temperature: geminiConfig.temperature,
      maxOutputTokens: geminiConfig.maxOutputTokens,
      topP: geminiConfig.topP,
      topK: geminiConfig.topK,
    },
  });
}; 
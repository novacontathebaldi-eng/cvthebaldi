import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// API Key directly injected as requested for testing environment
const API_KEY = "AIzaSyAIoPE0x2aafoV6aHCw-btQoHVIhkj6dtY";

// Initialize Gemini
const getAiClient = () => {
  if (!API_KEY) {
    console.warn("API_KEY is missing. Chatbot will operate in fallback mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "O sistema de IA não está configurado corretamente. Verifique a chave de API.";
  }

  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are 'Meeh Assistant', the AI assistant for Melissa Pelussi's Art Store.
        You are helpful, polite, and knowledgeable about contemporary art.
        You speak the user's language (Portuguese, English, French or German based on input).
        The artist is based in Luxembourg.
        Help users find products, understand shipping (worldwide), and art care.
        Answer briefly and elegantly.`,
      },
    });

    // Send message to the model
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar sua resposta.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, o assistente está temporariamente indisponível. Tente novamente mais tarde.";
  }
};
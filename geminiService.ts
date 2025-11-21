import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize Gemini
const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing. Chatbot will operate in fallback mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "O sistema de IA não está configurado. Por favor, adicione a API KEY.";
  }

  try {
    // Transform history to Gemini format if needed, but using single turn for simplicity in SPA demo without persisted chat context backend
    // For a full chat, we would use ai.chats.create() with the history
    
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are 'Meeh Assistant', the AI assistant for Melissa Pelussi's Art Store.
        You are helpful, polite, and knowledgeable about contemporary art.
        You speak the user's language.
        The artist is based in Luxembourg.
        Help users find products, understand shipping (worldwide), and art care.`,
      },
      // Ideally, map history here. For this stateless demo, we start fresh or rely on client maintaining the session
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Desculpe, não consegui processar sua resposta.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, o assistente está temporariamente indisponível.";
  }
};

'use server';

interface SubscribeState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
  };
}

// A leitura da variável de ambiente deve ser feita no topo ou dentro da função
// Vercel injeta process.env automaticamente
const LIST_ID = 5;

export async function subscribeToNewsletter(prevState: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = formData.get('email');
  const API_KEY = process.env.BREVO_API_KEY;

  // Basic Validation
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return {
      success: false,
      message: 'invalid_email'
    };
  }

  // Security check: Valida se a chave existe no ambiente de execução
  if (!API_KEY) {
    console.error("CRITICAL: Brevo API Key is missing in environment variables.");
    return {
      success: false,
      message: 'server_error'
    };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        updateEnabled: true // Atualiza se já existir (evita erro de duplicata travando o fluxo)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle duplicate gently
      if (errorData.code === 'duplicate_parameter') {
         return { success: true, message: 'already_subscribed' };
      }
      
      console.error("Brevo API Error:", errorData);
      throw new Error('Brevo API Error');
    }

    return { success: true };
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'server_error'
    };
  }
}
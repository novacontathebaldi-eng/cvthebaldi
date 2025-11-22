'use server';

interface SubscribeState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
  };
}

const API_KEY = "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";
const LIST_ID = 5;

export async function subscribeToNewsletter(prevState: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = formData.get('email');

  // Basic Validation
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return {
      success: false,
      message: 'invalid_email'
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
        updateEnabled: true // Atualiza se já existir
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Handle duplicate strictly if updateEnabled fails for some reason
      if (errorData.code === 'duplicate_parameter') {
         return { success: true, message: 'already_subscribed' };
      }
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
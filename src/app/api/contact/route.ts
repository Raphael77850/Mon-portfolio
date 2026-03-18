import { NextResponse } from 'next/server';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { success: false, message: 'Le nom complet doit contenir entre 2 et 100 caractères.' },
        { status: 400 }
      );
    }

    if (!email || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Veuillez saisir une adresse email valide.' },
        { status: 400 }
      );
    }

    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { success: false, message: 'Le message doit contenir entre 10 et 2000 caractères.' },
        { status: 400 }
      );
    }

    const formspreeId = process.env.FORMSPREE_FORM_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (!formspreeId) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Formulaire non configuré. Ajoutez FORMSPREE_FORM_ID dans les variables d\'environnement.',
        },
        { status: 503 }
      );
    }

    const upstreamResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Le service de contact est temporairement indisponible. Réessayez dans quelques minutes.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message transmis avec succès.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur technique est survenue. Merci de réessayer plus tard.',
      },
      { status: 500 }
    );
  }
}

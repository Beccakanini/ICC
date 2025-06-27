
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function partner({ to, templateId, params }) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.SENDINBLUE_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: 'Imanzi Cultural Collective',
        email: 'marketing@imanzi.com.au', // must be verified in Brevo
      },
      to: [{ email: to }],
      subject: 'New Partnership Request',
      templateId,
      params,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Brevo email failed:', errorData);
    throw new Error(errorData.message || 'Email failed');
  }

  console.log('✅ Brevo email sent successfully');
}

export async function sendRawEmail({ to, subject, htmlContent }) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.SENDINBLUE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: 'Imanzi Cultural Collective',
        email: 'marketing@imanzi.com.au',
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Email failed');
  }

  console.log(`✅ Raw email sent to ${to}`);
}

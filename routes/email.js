import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail({ to, templateId, params, sender, subject, htmlContent }) {
  const payload = {
    sender: sender || {
      name: 'Imanzi Cultural Collective',
      email: 'marketing@imanzi.com.au',
    },
    to: [{ email: to }],
    subject: subject || 'Imanzi Notification',
  };

  // If using template
  if (templateId) {
    payload.templateId = templateId;
    payload.params = params;
  } else if (htmlContent) {
    payload.htmlContent = htmlContent;
  } else {
    // If neither templateId nor htmlContent is provided, it's an error
    throw new Error('Either templateId or htmlContent must be provided');
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.SENDINBLUE_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Brevo email failed:', errorData);
    throw new Error(`Email failed: ${errorData.message || 'Unknown error'}`);
  }

  console.log('✅ Email sent via Brevo');
}

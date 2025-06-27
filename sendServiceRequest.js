import express from 'express';
import { sendEmail } from './email.js'; 

const router = express.Router();

router.post('/api/send-service-request', async (req, res) => {
  const { name, email, phone, service } = req.body;

  const adminMsg = `
    <h2>New Service Request</h2>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
  `;

  const userMsg = `
    <p>Hi ${name},</p>
    <p>Thank you for requesting <strong>${service}</strong> with Imanzi.</p>
    <p>We'll get in touch with you shortly!</p>
    <p>Warm Regards -Imanzi Cultural Collective </p>
  `;

  try {
    // Email to Imanzi
    await sendEmail({
  to: 'director@imanzi.com.au',
  templateId: null, // or just don't include it
  params: null,
  sender: {
    name: 'Imanzi Cultural Collective',
    email: 'marketing@imanzi.com.au',
  },
  subject: `New Request for ${service}`,
  htmlContent: adminMsg, // This needs to be sent directly if not using template
});

// Confirmation to user (template email)
await sendEmail({
  to: email,
  templateId: 1, // your Brevo template ID
  params: {
    name,
    service,
  },
  subject: `We've received your request for ${service}`, // required even in templates
});
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Service request email failed:', error);
    res.status(500).json({ success: false, error: 'Email failed' });
  }
});

export default router;

// backend/routes/partnerRequest.js
import express from 'express';
import { partner } from './partner.js'; // adjust path if needed
import { sendRawEmail } from './partner.js';


const router = express.Router();

router.post('/api/send-partner-request', async (req, res) => {
  const { name, email, message, role } = req.body;

  try {
    await partner({
      to: email, // where Imanzi should receive it
      templateId: 2, // ✅ replace with your actual Brevo template ID
      params: {
        name,
        email,
        role,
        message: `From ${name}:\n\n${message}`,
      },
    });
    await sendRawEmail({
  to: 'director@imanzi.com.au',
  subject: `New ${role} request from ${name}`,
  htmlContent: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #b30000;">New ${role} Join Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #3366cc;">${email}</a></p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f9f9f9; padding: 10px; border-left: 4px solid #b30000;">
        ${message.replace(/\n/g, '<br/>')}
      </div>
    </div>
  `,
});

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Partnership email failed:', error);
    res.status(500).json({ success: false, error: 'Email failed' });
  }
});

export default router;

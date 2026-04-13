import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const testResend = async () => {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_SENDER_EMAIL;
  const to = process.env.TO_EMAIL;

  console.log('🚀 Testing Resend Configuration...');
  console.log(`🔑 API Key configured: ${apiKey && apiKey !== 're_your_api_key_here' ? 'YES' : 'NO'}`);
  console.log(`📤 Sender: ${sender}`);
  console.log(`📥 Recipient: ${to}`);

  if (!apiKey || apiKey === 're_your_api_key_here') {
    console.error('❌ Error: Missing or invalid RESEND_API_KEY in .env');
    return;
  }

  const resend = new Resend(apiKey);

  try {
    console.log('⏳ Sending test email...');
    const { data, error } = await resend.emails.send({
      from: `Test <${sender}>`,
      to: [to],
      subject: 'Resend Migration Test',
      html: '<strong>Resend is working perfectly!</strong>',
    });

    if (error) {
      console.error('❌ Resend API Error:', error);
    } else {
      console.log('✅ Test email sent successfully!');
      console.log('ID:', data.id);
    }
  } catch (err) {
    console.error('❌ Unexpected Error:', err.message);
  }
};

testResend();

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const testEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log('Testing connection...');
    await transporter.verify();
    console.log('✅ Connection successful!');
    
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: 'vishukanoujiya820@gmail.com',
      subject: 'Test Email from Brevo SMTP',
      text: 'This is a test email to verify SMTP configuration.',
    });
    
    console.log('✅ Test email sent!', info.messageId);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testEmail();
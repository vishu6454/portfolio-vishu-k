import { Resend } from 'resend';

let resendInstance = null;

const initResend = () => {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
      console.warn('⚠️ Resend API key is missing or placeholder. Email sending will likely fail.');
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend API initialized');
  }
  return resendInstance;
};

export const sendContactEmail = async (contactData) => {
  const { user_name, user_email, subject, message } = contactData;
  
  try {
    const resend = initResend();
    
    const emailSubject = subject 
      ? `Portfolio Contact: ${subject} from ${user_name}`
      : `New Contact Message from ${user_name}`;
    
    // 1. Email to yourself (admin notification)
    const adminEmailPayload = {
      from: `Portfolio Contact <${process.env.RESEND_SENDER_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✨ New Portfolio Contact Message</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${user_name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${user_email}">${user_email}</a></div>
              </div>
              ${subject ? `
              <div class="field">
                <div class="label">Subject:</div>
                <div>${subject}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Message from ${user_name}
        Email: ${user_email}
        ${subject ? `Subject: ${subject}` : ''}
        Message: ${message}
      `
    };

    // 2. Auto-reply to user
    const userEmailPayload = {
      from: `Vishu Kanoujiya <${process.env.RESEND_SENDER_EMAIL}>`,
      to: user_email,
      subject: `Thank you for contacting me, ${user_name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Reaching Out! 🚀</h2>
            </div>
            <div class="content">
              <p>Dear ${user_name},</p>
              <p>Thank you for contacting me. I have received your message and will get back to you within 24-48 hours.</p>
              
              <p><strong>Here's a copy of your message:</strong></p>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <p>Best regards,<br>
              <strong>Vishu Kanoujiya</strong><br>
              Full Stack Developer</p>
              
              <div class="footer">
                <p>This is an automated response.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Thank you for contacting me, ${user_name}!
        
        I have received your message and will get back to you within 24-48 hours.
        
        Your message:
        ${message}
        
        Best regards,
        Vishu Kanoujiya
        Full Stack Developer
      `
    };
    
    console.log('📧 Sending emails via Resend API...');
    
    // Send both emails in parallel
    const [adminResult, userResult] = await Promise.all([
      resend.emails.send(adminEmailPayload),
      resend.emails.send(userEmailPayload)
    ]);
    
    if (adminResult.error) {
      console.error('❌ Admin email error:', adminResult.error);
    } else {
      console.log('✅ Admin email sent:', adminResult.data.id);
    }

    if (userResult.error) {
      console.error('❌ User email error:', userResult.error);
    } else {
      console.log('✅ User email sent:', userResult.data.id);
    }
    
    // Check if at least the notification to self was successful
    if (adminResult.data) {
      return { 
        success: true, 
        message: 'Emails sent successfully',
        id: adminResult.data.id
      };
    } else {
      throw new Error(adminResult.error?.message || 'Failed to send admin notification');
    }
  } catch (error) {
    console.error('❌ Resend API error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
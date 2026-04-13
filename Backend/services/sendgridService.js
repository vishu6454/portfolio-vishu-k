import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendContactEmail = async (contactData) => {
  const { user_name, user_email, subject, message } = contactData;
  
  const adminMsg = {
    to: process.env.TO_EMAIL,
    from: process.env.EMAIL_USER,
    subject: subject || `New Contact from ${user_name}`,
    html: `<strong>Name:</strong> ${user_name}<br>
           <strong>Email:</strong> ${user_email}<br>
           <strong>Message:</strong> ${message}`,
  };
  
  const userMsg = {
    to: user_email,
    from: process.env.EMAIL_USER,
    subject: `Thank you for contacting me, ${user_name}!`,
    html: `<h3>Thank you for reaching out!</h3>
           <p>I have received your message and will get back to you soon.</p>
           <p>Your message: ${message}</p>`,
  };
  
  await Promise.all([
    sgMail.send(adminMsg),
    sgMail.send(userMsg)
  ]);
  
  return { success: true };
};
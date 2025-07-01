import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { IEmailOptions } from '../types/interfaces/IEmailOptions';

dotenv.config();

const createTransporter = () => nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const sendEmail = async (options: IEmailOptions): Promise<any> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions: IEmailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };
    
    console.log(`Tentative d'envoi d'email à: ${options.to}`);
    const result = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès:', result);
    return result;
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, firstName: string, lastName: string): Promise<any> => {
  const subject = 'Bienvenue sur Hemicycle!';
  const html = `
    <html>
      <body>
        <h2>Bienvenue sur Hemicycle, ${firstName} ${lastName}!</h2>
        <p>Merci pour votre inscription sur notre plateforme Hemicycle.</p>
        <p>Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter et commencer à utiliser notre application.</p>
        <p>Cordialement,<br>L'équipe Hemicycle</p>
      </body>
    </html>
  `;
  
  return await sendEmail({
    to: email,
    subject,
    from: process.env.EMAIL_FROM || 'noreply@hemicycle.app',
    html,
    text: `Bienvenue sur Hemicycle, ${firstName} ${lastName}! Merci pour votre inscription sur notre plateforme Hemicycle. Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter et commencer à utiliser notre application. Cordialement, L'équipe Hemicycle`
  });
};

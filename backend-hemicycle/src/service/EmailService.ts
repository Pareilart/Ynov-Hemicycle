import nodemailer from 'nodemailer';
import { IEmailOptions } from '../types/interfaces/IEmailOptions';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });
};

export const sendEmail = async (options: IEmailOptions): Promise<any> => {
  const transporter = createTransporter();
  
  const mailOptions: IEmailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  return await transporter.sendMail(mailOptions);
};
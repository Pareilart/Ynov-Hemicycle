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
  const transporter = createTransporter();

  const mailOptions: IEmailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  return transporter.sendMail(mailOptions);
};

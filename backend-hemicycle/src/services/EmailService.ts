import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';
import { IEmailOptions } from '../types/interfaces/IEmailOptions';

dotenv.config();

const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN || '' });

const defaultSender = {
  email: 'hello@demomailtrap.co',
  name: 'Hemicycle',
};

export const sendEmail = async (options: IEmailOptions): Promise<any> => {
  try {
    const recipient = process.env.NODE_ENV === 'development'
      ? { email: process.env.MAILTRAP_DEFAULT_SENDER || 'hello@demomailtrap.co' }
      : { email: Array.isArray(options.to) ? options.to[0] : options.to };

    const emailConfig = {
      from: defaultSender,
      to: [recipient],
      ...(options.template_uuid
        ? {
          template_uuid: options.template_uuid,
          template_variables: options.template_variables || {},
        }
        : {
          subject: options.subject || '',
          text: options.text || '',
          html: options.html || '',
        }),
    };

    return await client.send(emailConfig);
  } catch (error) {
    throw new Error('Échec de l\'envoi de l\'email. Veuillez vérifier la configuration de Mailtrap et réessayer.');
  }
};

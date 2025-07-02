import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';
import { IEmailOptions } from '../types/interfaces/IEmailOptions';

dotenv.config();

const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN || '' });

const defaultSender = {
  email: 'hello@demomailtrap.co',
  name: 'Hemicycle',
};

export const sendEmailSandbox = async (options: IEmailOptions): Promise<any> => {
  try {
    if (!process.env.MAILTRAP_SANDBOX_API_TOKEN) {
      throw new Error('MAILTRAP_SANDBOX_API_TOKEN est manquant dans les variables d\'environnement');
    }

    if (!process.env.MAILTRAP_SANDBOX_TEST_INBOX_ID) {
      throw new Error('MAILTRAP_SANDBOX_TEST_INBOX_ID est manquant dans les variables d\'environnement');
    }

    const sandboxClient = new MailtrapClient({
      token: process.env.MAILTRAP_SANDBOX_API_TOKEN,
      testInboxId: Number(process.env.MAILTRAP_SANDBOX_TEST_INBOX_ID),
      accountId: Number(process.env.MAILTRAP_ACCOUNT_ID),
      sandbox: true,
    });

    const sender = {
      email: defaultSender.email,
      name: defaultSender.name,
    };

    const recipients = [
      { email: Array.isArray(options.to) ? options.to[0] : options.to },
    ];

    const emailData = {
      from: sender,
      to: recipients,
      ...(options.template_uuid
        ? {
          template_uuid: options.template_uuid,
          template_variables: options.template_variables || {},
        }
        : {
          subject: options.subject || 'Test Email',
          text: options.text || 'Ceci est un email de test depuis Hemicycle',
          category: 'Integration Test',
        }),
    };

    return await sandboxClient.send(emailData);
  } catch (error) {
    console.log('sendEmailSandbox', error);
    throw new Error('Échec de l\'envoi de l\'email sandbox. Veuillez vérifier la configuration de Mailtrap et réessayer.');
  }
};

export const sendEmail = async (options: IEmailOptions): Promise<any> => {
  try {
    const recipient = { email: Array.isArray(options.to) ? options.to[0] : options.to };

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
    console.log('sendEmail', error);
    throw new Error('Échec de l\'envoi de l\'email. Veuillez vérifier la configuration de Mailtrap et réessayer.');
  }
};

export const sendEmailWrapper = async (options: IEmailOptions): Promise<any> => {
  try {
    // En production, on utilise sendEmail, sinon on utilise sendEmailSandbox
    if (process.env.NODE_ENV === 'production') {
      return await sendEmail(options);
    }
    return await sendEmailSandbox(options);
  } catch (error) {
    console.log('sendEmailWrapper', error);
    throw new Error('Échec de l\'envoi de l\'email. Une erreur est survenue lors de l\'envoi.');
  }
};

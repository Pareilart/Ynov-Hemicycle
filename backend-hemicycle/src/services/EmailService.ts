import { Resend } from 'resend';
import dotenv from 'dotenv';
import { IEmailOptions } from '../types/interfaces/IEmailOptions';
import { generateSecurityCodeTemplate } from '../templates/securityCodeTemplate';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const defaultSender = {
  email: process.env.EMAIL_FROM_ADDRESS || 'noreply@hemicycle.fr',
  name: process.env.EMAIL_FROM_NAME || 'Hemicycle',
};

/**
 * Détermine l'adresse email de destination finale.
 * En mode développement, redirige tous les emails vers l'adresse du développeur.
 */
const getDestinationEmail = (originalTo: string | string[]): string[] => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const devEmailOverride = process.env.DEV_EMAIL_OVERRIDE;
  
  if (isDevelopment && devEmailOverride) {
    const originalRecipients = Array.isArray(originalTo) ? originalTo : [originalTo];
    console.log(`🔄 [DEV MODE] Email(s) redirigé(s) de [${originalRecipients.join(', ')}] vers [${devEmailOverride}]`);
    return [devEmailOverride];
  }
  
  return Array.isArray(originalTo) ? originalTo : [originalTo];
};

export const sendEmailSandbox = async (options: IEmailOptions): Promise<any> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY est manquant dans les variables d\'environnement');
    }

    const recipients = getDestinationEmail(options.to);
    
    // Génération du contenu basé sur les templates ou contenu direct
    let emailContent: { html?: string; text?: string; subject?: string } = {};

    // Gestion des anciens templates Mailtrap
    if (options.template_uuid && options.template_variables) {
      const variables = options.template_variables;
      
      // Template 2FA/Login
      if (options.template_uuid === 'c2f0396e-2cd1-4e0d-821a-7de1a8638176') {
        const template = generateSecurityCodeTemplate({
          firstname: variables.firstname || '',
          lastname: variables.lastname || '',
          security_code: variables.security_code || '',
          company_info_name: variables.company_info_name,
          company_info_address: variables.company_info_address,
          company_info_city: variables.company_info_city,
          company_info_zip_code: variables.company_info_zip_code,
          company_info_country: variables.company_info_country,
        });
        emailContent = {
          subject: 'Code de vérification - Hemicycle',
          html: template.html,
          text: template.text,
        };
      }
      // Template Email Verification (utilise le même template que 2FA)
      else if (options.template_uuid === '13a6e90c-236b-4d8a-a49d-bf4554ab1aa5') {
        const template = generateSecurityCodeTemplate({
          firstname: variables.firstname || '',
          lastname: variables.lastname || '',
          security_code: variables.security_code || '',
          company_info_name: variables.company_info_name,
          company_info_address: variables.company_info_address,
          company_info_city: variables.company_info_city,
          company_info_zip_code: variables.company_info_zip_code,
          company_info_country: variables.company_info_country,
        });
        emailContent = {
          subject: 'Code de vérification - Hemicycle',
          html: template.html,
          text: template.text,
        };
      }
    } else {
      // Utilisation du contenu direct
      emailContent = {
        subject: options.subject || 'Email depuis Hemicycle',
        text: options.text,
        html: options.html,
      };
    }

    const emailData = {
      from: `${defaultSender.name} <${defaultSender.email}>`,
      to: recipients,
      subject: emailContent.subject || 'Email depuis Hemicycle',
      text: emailContent.text || 'Ceci est un email de test depuis Hemicycle',
      html: emailContent.html,
      tags: [
        { name: 'environment', value: 'development' },
        { name: 'category', value: 'security' }
      ],
    };

    console.log('📤 Envoi email (Sandbox):', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    const result = await resend.emails.send(emailData);
    console.log('📨 Réponse Resend (Sandbox):', result);
    
    // Vérifier si Resend a renvoyé une erreur
    if (result.error) {
      const errorInfo = result.error as any;
      throw new Error(`Erreur Resend: ${result.error.message} ${errorInfo.statusCode ? `(${errorInfo.statusCode})` : ''}`);
    }
    
    return result;
  } catch (error) {
    console.log('sendEmailSandbox', error);
    throw new Error('Échec de l\'envoi de l\'email de développement. Veuillez vérifier la configuration de Resend et réessayer.');
  }
};

export const sendEmail = async (options: IEmailOptions): Promise<any> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY est manquant dans les variables d\'environnement');
    }

    const recipients = getDestinationEmail(options.to);
    
    // Génération du contenu basé sur les templates ou contenu direct
    let emailContent: { html?: string; text?: string; subject?: string } = {};

    // Gestion des anciens templates Mailtrap
    if (options.template_uuid && options.template_variables) {
      const variables = options.template_variables;
      
      // Template 2FA/Login
      if (options.template_uuid === 'c2f0396e-2cd1-4e0d-821a-7de1a8638176') {
        const template = generateSecurityCodeTemplate({
          firstname: variables.firstname || '',
          lastname: variables.lastname || '',
          security_code: variables.security_code || '',
          company_info_name: variables.company_info_name,
          company_info_address: variables.company_info_address,
          company_info_city: variables.company_info_city,
          company_info_zip_code: variables.company_info_zip_code,
          company_info_country: variables.company_info_country,
        });
        emailContent = {
          subject: 'Code de vérification - Hemicycle',
          html: template.html,
          text: template.text,
        };
      }
      // Template Email Verification (utilise le même template que 2FA)
      else if (options.template_uuid === '13a6e90c-236b-4d8a-a49d-bf4554ab1aa5') {
        const template = generateSecurityCodeTemplate({
          firstname: variables.firstname || '',
          lastname: variables.lastname || '',
          security_code: variables.security_code || '',
          company_info_name: variables.company_info_name,
          company_info_address: variables.company_info_address,
          company_info_city: variables.company_info_city,
          company_info_zip_code: variables.company_info_zip_code,
          company_info_country: variables.company_info_country,
        });
        emailContent = {
          subject: 'Code de vérification - Hemicycle',
          html: template.html,
          text: template.text,
        };
      }
    } else {
      // Utilisation du contenu direct
      emailContent = {
        subject: options.subject || 'Email depuis Hemicycle',
        text: options.text,
        html: options.html,
      };
    }

    const emailData = {
      from: `${defaultSender.name} <${defaultSender.email}>`,
      to: recipients,
      subject: emailContent.subject || 'Email depuis Hemicycle',
      text: emailContent.text || '',
      html: emailContent.html,
      tags: [
        { name: 'environment', value: 'production' },
        { name: 'category', value: 'security' }
      ],
    };

    console.log('📤 Envoi email (Production):', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    const result = await resend.emails.send(emailData);
    console.log('📨 Réponse Resend (Production):', result);
    
    // Vérifier si Resend a renvoyé une erreur
    if (result.error) {
      const errorInfo = result.error as any;
      throw new Error(`Erreur Resend: ${result.error.message} ${errorInfo.statusCode ? `(${errorInfo.statusCode})` : ''}`);
    }
    
    return result;
  } catch (error) {
    console.log('sendEmail', error);
    throw new Error('Échec de l\'envoi de l\'email. Veuillez vérifier la configuration de Resend et réessayer.');
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

import { Request, Response } from 'express';
import { sendEmail } from '../service/EmailService';

export const sendTestEmail = async (req: Request, res: Response) => {
  try {
    const result = await sendEmail({
      to: req.body.to,
      subject: 'Test depuis Postman',
      html: '<html><body><p>Test d\'envoi d\'email via Postman!</p></body></html>'
    });

    res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email',
      error: error
    });
  }
};
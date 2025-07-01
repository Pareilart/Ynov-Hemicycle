import { Request, Response } from 'express';
import { sendWelcomeEmail } from '../service/EmailService';
import User from '../models/User';

export const sendWelcomeEmailToUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'L\'adresse email est requise'
      });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé avec cet email'
      });
    }

    const result = await sendWelcomeEmail(email, user.firstName, user.lastName);

    res.status(200).json({
      success: true,
      message: 'Email de bienvenue envoyé avec succès',
      data: result
    });
  } catch (error) {
    console.error('Erreur d\'envoi d\'email de bienvenue:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email de bienvenue',
      error: error
    });
  }
};
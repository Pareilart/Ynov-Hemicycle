import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface TokenPayload {
    userId: Types.ObjectId;
    role: string;
}

/**
 * Génère un token JWT pour un utilisateur
 * @param userId - L'ID de l'utilisateur
 * @param userRole - Le rôle de l'utilisateur
 * @returns Le token JWT généré
 * @throws Error si JWT_SECRET n'est pas défini
 */
export const generateToken = (userId: Types.ObjectId, userRole: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("La clé secrète JWT n'est pas définie");
    }

    const payload: TokenPayload = {
        userId,
        role: userRole
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}; 
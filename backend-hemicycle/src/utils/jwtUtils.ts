import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface TokenPayload {
    userId: Types.ObjectId;
    role: string;
}

interface TokenResponse {
    token: string;
    expiresAt: Date;
    expiresIn: number; // en secondes
}

/**
 * Génère un token JWT pour un utilisateur
 * @param userId - L'ID de l'utilisateur
 * @param userRole - Le rôle de l'utilisateur
 * @returns Un objet contenant le token JWT, sa date d'expiration et le délai avant expiration
 * @throws Error si JWT_SECRET n'est pas défini
 */
export const generateToken = (userId: Types.ObjectId, userRole: string): TokenResponse => {
    if (!process.env.JWT_SECRET) {
        throw new Error("La clé secrète JWT n'est pas définie");
    }

    const expiresIn = 24 * 60 * 60; // 24 heures en secondes
    const expiresAt = new Date(Date.now() + expiresIn * 1000); // Conversion en millisecondes

    const payload: TokenPayload = {
        userId,
        role: userRole
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn }
    );

    return {
        token,
        expiresAt,
        expiresIn
    };
}; 
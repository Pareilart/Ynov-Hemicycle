import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface TokenPayload {
  userId: string;
  role: string;
}

interface TokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: Date;
}

const ACCESS_TOKEN_EXPIRATION = '15m';
const REFRESH_TOKEN_EXPIRATION = '7d';

/**
 * Génère un token JWT pour un utilisateur
 * @param userId - L'ID de l'utilisateur
 * @param role - Le rôle de l'utilisateur
 * @returns Un objet contenant le token JWT, sa date d'expiration et le délai avant expiration
 * @throws Error si JWT_SECRET n'est pas défini
 */
export const generateToken = (userId: Types.ObjectId, role: string): TokenResponse => {
  if (!process.env.JWT_SECRET) {
    throw new Error('La clé secrète JWT n\'est pas définie');
  }

  const accessToken = jwt.sign(
    { userId: userId.toString(), role },
    process.env.JWT_SECRET as string,
    { expiresIn: ACCESS_TOKEN_EXPIRATION },
  );

  const refreshToken = jwt.sign(
    { userId: userId.toString(), role },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: REFRESH_TOKEN_EXPIRATION },
  );

  const decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;
  const expiresAt = new Date((decodedToken.exp as number) * 1000);

  return {
    token: accessToken,
    refreshToken,
    expiresIn: parseInt(ACCESS_TOKEN_EXPIRATION, 10),
    expiresAt,
  };
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (refreshToken: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const refreshAccessToken = (refreshToken: string): TokenResponse | null => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) return null;

  return generateToken(new Types.ObjectId(decoded.userId), decoded.role);
};

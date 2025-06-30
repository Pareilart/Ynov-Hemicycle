import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';
import { RoleEnum } from '../enum/RoleEnum';
import { AuthenticatedRequest } from '../middleware/auth';
import { UserResponse, RoleResponse, IUserPopulated } from '../types';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: user._id,
            token
        });
    } catch (error: any) {
        console.error('Erreur de connexion:', error);
        res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Vérification des champs requis
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ 
                message: "Tous les champs sont requis",
                required: ["email", "password", "firstName", "lastName"]
            });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Trouver le rôle "user"
        const userRole = await Role.findOne({ name: RoleEnum.USER });
        if (!userRole) {
            return res.status(500).json({ message: "Erreur: le rôle 'user' n'existe pas dans la base de données" });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: userRole._id,
        });

        await user.save();

        // Générer le token JWT
        const token = jwt.sign(
            { userId: user._id, role: userRole.name },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Utilisateur créé avec succès",
            userId: user._id,
            token
        });
    } catch (error: any) {
        console.error('Erreur d\'inscription:', error);
        res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const user = await User.findById(req.user._id)
            .populate('role')
            .populate('addresses')
            .select('-password') as IUserPopulated | null;

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const userResponse: UserResponse = {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            sexe: user.sexe,
            emailVerifiedAt: user.emailVerifiedAt,
            role: {
                id: user.role._id.toString(),
                name: user.role.name,
                description: user.role.description,
            },
            addresses: user.addresses ? {
                line1: user.addresses.line1,
                line2: user.addresses.line2,
                postalCode: user.addresses.postalCode,
                city: user.addresses.city,
                state: user.addresses.state,
                country: user.addresses.country,
            } : undefined
        };

        res.status(200).json(userResponse);
    } catch (error: any) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: "Erreur lors de la récupération du profil", error: error.message });
    }
}; 
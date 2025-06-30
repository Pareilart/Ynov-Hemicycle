import { Request, Response } from 'express';
import User from '../models/User';
import { RoleEnum } from '../enum/RoleEnum';
import { AuthenticatedRequest } from '../middleware/auth';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().populate('role', 'name').populate('city', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id).populate('role', 'name').populate('city', 'name');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            Object.assign(user, req.body);
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: "Utilisateur supprimé" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


const User = require('../models/User');
const RoleEnum = require('../enum/RoleEnum');
const Role = require('../models/Role');
export {};

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== RoleEnum.ADMIN) {
            return res.status(404);
        }
        const users = await User.find().populate('role', 'name').populate('city', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        if (req.user.role !== RoleEnum.ADMIN || req.user.id !== req.params.id) {
            return res.status(404);
        }

        const user = await User.findById(req.params.id).populate('role', 'name').populate('city', 'name');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        if (req.user.role !== RoleEnum.ADMIN || req.user.id !== req.params.id) {
            return res.status(404);
        }

        const user = await User.findById(req.params.id);
        if (user) {
            Object.assign(user, req.body);
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== RoleEnum.ADMIN || req.user.id !== req.params.id) {
            return res.status(404);
        }
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: "Utilisateur supprimé" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


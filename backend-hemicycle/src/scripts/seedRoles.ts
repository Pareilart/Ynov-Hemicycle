import mongoose from 'mongoose';
import Role from '../models/Role';
import { RoleEnum } from '../enum/RoleEnum';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const seedRoles = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hemicycle';
        console.log('Tentative de connexion à MongoDB...');
        
        await mongoose.connect(mongoUri);
        console.log('Connecté à MongoDB avec succès');

        // Créer les rôles de base
        const roles = [
            {
                name: RoleEnum.USER,
                description: 'Utilisateur standard'
            },
            {
                name: RoleEnum.ADMIN,
                description: 'Administrateur du système'
            },
            {
                name: RoleEnum.DEPUTY,
                description: 'Député'
            }
        ];

        console.log('Début de l\'initialisation des rôles...');
        
        for (const role of roles) {
            console.log(`Traitement du rôle: ${role.name}`);
            const updatedRole = await Role.findOneAndUpdate(
                { name: role.name },
                role,
                { upsert: true, new: true }
            );
            console.log(`Rôle ${role.name} mis à jour/créé avec l'ID: ${updatedRole._id}`);
        }

        console.log('Rôles initialisés avec succès');
        await mongoose.connection.close();
        console.log('Connexion MongoDB fermée');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des rôles:', error);
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('Connexion MongoDB fermée après erreur');
        }
        process.exit(1);
    }
};

seedRoles(); 
import mongoose from 'mongoose';
import Role from '../models/Role';
import { RoleEnum } from '../enum/RoleEnum';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

export const seedRoles = async () => {
    try {
        // Ne pas se connecter si on est déjà connecté
        if (mongoose.connection.readyState !== 1) {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hemicycle';
            console.log('Tentative de connexion à MongoDB...');
            await mongoose.connect(mongoUri);
            console.log('Connecté à MongoDB avec succès');
        }

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
        
        // Supprimer d'abord tous les rôles existants
        await Role.deleteMany({});
        console.log('Base de données nettoyée des anciens rôles');

        // Créer les nouveaux rôles
        for (const role of roles) {
            console.log(`Création du rôle: ${role.name}`);
            const newRole = await Role.create(role);
            console.log(`Rôle ${role.name} créé avec l'ID: ${newRole._id}`);
        }

        console.log('Rôles initialisés avec succès');

        // Ne fermer la connexion que si on est en mode standalone
        if (require.main === module) {
            await mongoose.connection.close();
            console.log('Connexion MongoDB fermée');
            process.exit(0);
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des rôles:', error);
        // Ne fermer la connexion que si on est en mode standalone
        if (require.main === module && mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('Connexion MongoDB fermée après erreur');
            process.exit(1);
        }
        throw error; // Propager l'erreur pour la gestion dans seed.ts
    }
};

// Exécuter directement si appelé en tant que script
if (require.main === module) {
    (async () => {
        try {
            await seedRoles();
        } catch (error) {
            console.error('Erreur:', error);
            process.exit(1);
        }
    })();
} 
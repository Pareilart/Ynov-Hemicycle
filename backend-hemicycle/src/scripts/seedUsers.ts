import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User';
import Role from '../models/Role';
import { RoleEnum } from '../enum/RoleEnum';

// Charger les variables d'environnement
dotenv.config();

export const seedUsers = async () => {
  try {
    // Ne pas se connecter si on est déjà connecté
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hemicycle';
      console.log('Tentative de connexion à MongoDB...');
      await mongoose.connect(mongoUri);
      console.log('Connecté à MongoDB avec succès');
    }

    // Hasher le mot de passe
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Récupérer les rôles
    const userRole = await Role.findOne({ name: RoleEnum.USER });
    const adminRole = await Role.findOne({ name: RoleEnum.ADMIN });
    const deputyRole = await Role.findOne({ name: RoleEnum.DEPUTY });

    if (!userRole || !adminRole || !deputyRole) {
      throw new Error('Les rôles nécessaires n\'ont pas été trouvés. Veuillez exécuter seedRoles.ts d\'abord.');
    }

    // Créer les utilisateurs
    const users = [
      {
        firstname: 'User',
        lastname: 'Test',
        email: 'user@test.com',
        password: hashedPassword,
        role: userRole._id,
        hasOnBoarding: true,
      },
      {
        firstname: 'Admin',
        lastname: 'Test',
        email: 'admin@test.com',
        password: hashedPassword,
        role: adminRole._id,
        hasOnBoarding: true,
      },
      {
        firstname: 'Deputy',
        lastname: 'Test',
        email: 'deputy@test.com',
        password: hashedPassword,
        role: deputyRole._id,
        hasOnBoarding: true,
      },
    ];

    console.log('Début de l\'initialisation des utilisateurs...');

    // Supprimer d'abord tous les utilisateurs existants
    await User.deleteMany({});
    console.log('Base de données nettoyée des anciens utilisateurs');

    // Créer les nouveaux utilisateurs
    for (const userData of users) {
      console.log(`Création de l'utilisateur: ${userData.email}`);
      const newUser = await User.create(userData);
      console.log(`Utilisateur ${userData.email} créé avec l'ID: ${newUser._id}`);
    }

    console.log('Utilisateurs initialisés avec succès');

    // Ne fermer la connexion que si on est en mode standalone
    if (require.main === module) {
      await mongoose.connection.close();
      console.log('Connexion MongoDB fermée');
      process.exit(0);
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des utilisateurs:', error);
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
      await seedUsers();
    } catch (error) {
      console.error('Erreur:', error);
      process.exit(1);
    }
  })();
}

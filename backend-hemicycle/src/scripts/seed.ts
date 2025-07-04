import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedRoles } from './seedRoles';
import { seedUsers } from './seedUsers';

// Charger les variables d'environnement
dotenv.config(); // Charger les variables d'environnement

const runAllSeeds = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hemicycle';
    console.log('🚀 Début du processus de seed global...');
    console.log('📡 Tentative de connexion à MongoDB...');

    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB avec succès');

    console.log('\n📋 Étape 1: Initialisation des rôles');
    await seedRoles();
    console.log('✅ Rôles initialisés avec succès\n');

    console.log('👥 Étape 2: Initialisation des utilisateurs');
    await seedUsers();
    console.log('✅ Utilisateurs initialisés avec succès\n');

    console.log('🎉 Tous les seeds ont été exécutés avec succès !');

    await mongoose.connection.close();
    console.log('📡 Connexion MongoDB fermée');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du processus de seed:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('📡 Connexion MongoDB fermée après erreur');
    }
    process.exit(1);
  }
};

// Exécuter le script
runAllSeeds();

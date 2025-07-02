import request from 'supertest';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import deputeRoutes from '../../routes/Deputy/deputeRoutes';
import { auth } from '../../middleware/auth';
import Depute from '../../models/Depute';
import { IDepute } from '../../types';

// Mock du middleware d'authentification
jest.mock('../../middleware/auth', () => ({
  auth: jest.fn((req, res, next) => {
    // Simuler un utilisateur authentifié
    req.user = {
      _id: new mongoose.Types.ObjectId(),
      email: 'test@example.com'
    };
    next();
  }),
  isDeputy: jest.fn((req, res, next) => next())
}));

// Créer une application Express pour les tests
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/deputy', deputeRoutes);
  return app;
};

describe('Deputy Routes', () => {
  let app: express.Application;
  let testDepute: any; // Utiliser any pour éviter les problèmes de typage

  beforeAll(async () => {
    // Connexion à la base de données de test
    const mongoUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/hemicycle-test';
    await mongoose.connect(mongoUri);
    
    app = createTestApp();
  });

  beforeEach(async () => {
    // Nettoyer la collection avant chaque test
    await Depute.deleteMany({});
    
    // Créer un député de test
    // Utilisation de la forme compatible avec le schéma
    testDepute = await Depute.create({
      nom: 'Dupont',
      prenom: 'Jean',
      parti: 'Parti Test',
      circonscription: 'Test-1',
      dateNaissance: new Date('1980-01-01'),
      photo: 'https://example.com/photo.jpg',
      mandats: ['Assemblée Nationale 2020-2025'], // Format de chaîne de caractères
      contact: {
        email: 'jean.dupont@assemblee.fr',
        telephone: '0123456789'
      }
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/deputy', () => {
    test('should return all deputies', async () => {
      const response = await request(app)
        .get('/api/deputy')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty('nom', 'Dupont');
      expect(response.body[0]).toHaveProperty('prenom', 'Jean');
      expect(response.body[0]).toHaveProperty('parti', 'Parti Test');
    });
  });

  describe('GET /api/deputy/:id', () => {
    test('should return a specific deputy by ID', async () => {
      const response = await request(app)
        .get(`/api/deputy/${testDepute._id}`)
        .expect(200);

      expect(response.body).toHaveProperty('nom', 'Dupont');
      expect(response.body).toHaveProperty('prenom', 'Jean');
      expect(response.body).toHaveProperty('parti', 'Parti Test');
      expect(response.body).toHaveProperty('circonscription', 'Test-1');
    });

    test('should return 404 for non-existent deputy', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/deputy/${fakeId}`)
        .expect(404);
    });
  });

  describe('POST /api/deputy', () => {
    test('should create a new deputy', async () => {
      const newDeputy = {
        nom: 'Martin',
        prenom: 'Sophie',
        parti: 'Autre Parti',
        circonscription: 'Test-2',
        dateNaissance: '1975-05-15',
        photo: 'https://example.com/sophie.jpg',
        mandats: ['Assemblée Nationale 2018-2023'], // Format simplifié
        contact: {
          email: 'sophie.martin@assemblee.fr',
          telephone: '9876543210'
        }
      };

      const response = await request(app)
        .post('/api/deputy')
        .send(newDeputy)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('nom', 'Martin');
      expect(response.body).toHaveProperty('prenom', 'Sophie');
      expect(response.body).toHaveProperty('parti', 'Autre Parti');

      // Vérifier que le député a bien été enregistré dans la base
      const savedDeputy = await Depute.findById(response.body._id);
      expect(savedDeputy).not.toBeNull();
      expect(savedDeputy?.nom).toBe('Martin');
    });

    test('should return 400 for invalid data', async () => {
      const invalidDeputy = {
        // Données manquantes
        nom: 'Incomplet'
      };

      await request(app)
        .post('/api/deputy')
        .send(invalidDeputy)
        .expect(400);
    });
  });

  describe('PUT /api/deputy/:id', () => {
    test('should update an existing deputy', async () => {
      const updates = {
        parti: 'Nouveau Parti',
        circonscription: 'Test-Updated'
      };

      const response = await request(app)
        .put(`/api/deputy/${testDepute._id}`)
        .send(updates)
        .expect(200);

      expect(response.body).toHaveProperty('parti', 'Nouveau Parti');
      expect(response.body).toHaveProperty('circonscription', 'Test-Updated');
      
      // Vérifier que les données ont bien été mises à jour
      const updatedDeputy = await Depute.findById(testDepute._id);
      expect(updatedDeputy?.parti).toBe('Nouveau Parti');
      expect(updatedDeputy?.circonscription).toBe('Test-Updated');
    });

    test('should return 404 for non-existent deputy', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/api/deputy/${fakeId}`)
        .send({ parti: 'Nouveau Parti' })
        .expect(404);
    });
  });

  describe('DELETE /api/deputy/:id', () => {
    test('should delete an existing deputy', async () => {
      await request(app)
        .delete(`/api/deputy/${testDepute._id}`)
        .expect(200);

      // Vérifier que le député a bien été supprimé
      const deletedDeputy = await Depute.findById(testDepute._id);
      expect(deletedDeputy).toBeNull();
    });

    test('should return 404 for non-existent deputy', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/api/deputy/${fakeId}`)
        .expect(404);
    });
  });
});
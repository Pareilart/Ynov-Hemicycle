import request from 'supertest';
import express from 'express';
import cors from 'cors';
import authRoutes from '../../routes/Auth/authRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const createTestApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/auth', authRoutes);

    

    return app;
};

describe('Auth Routes', () => {
    let app: express.Application;

    beforeAll(async () => {
        jest.setTimeout(30000); // Augmenter le timeout pour les tests
        try {
            // Attendre que la connexion à la base de données soit établie
            await mongoose.connect(process.env.MONGODB_URI || '');
            console.log('Connected to the database');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error; // Faire échouer les tests si la connexion échoue
        }

        app = createTestApp();
    });

    afterAll(async () => {
        // Close the database connection after tests
        await mongoose.connection.close();
    });

    describe('POST /api/auth/register', () => {
        test('should return 201 if registration is successful', async () => {
            const uniqueEmail = `test${Date.now()}@example.com`;
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: uniqueEmail,
                    password: 'Motdepasse1@',
                    firstname: 'John',
                    lastname: 'Doe',
                    sexe: 'Homme',
                    birthday: '1990-01-01',
                    twoFactorEnabled: true,
                });
            expect(response.status).toBe(201); // Cette assertion passera toujours
        });

        test('should return 400 if email is invalid', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'invalid-email',
                    password: 'password123'
                });
            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        test('should return 200 if login is successful', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testyan@hotmail.fr',
                    password: 'Motdepasse1@'
                });
            expect(response.status).toBe(200);
        });

        test('should return 401 if credentials are invalid', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'user@example.com',
                    password: 'wrongpassword'
                });
            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/auth/me', () => {
        
        test('should return 200 and user data if authenticated', async () => {
            // First login to get auth token
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'yanroger@gmail.com',
                    password: 'Motdepasse1@'
                });

            const token = loginResponse.body.token;

            const response = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('user');
        });

        test('should return 401 if not authenticated', async () => {
            const response = await request(app)
                .get('/api/auth/me');

            expect(response.status).toBe(401);
        });
    });
});

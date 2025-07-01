import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import deputeRoutes from './routes/deputeRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import lawPostRoutes from './routes/lawPostRoutes';
import emailRoutes from './routes/emailRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/deputes', deputeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/law-posts', lawPostRoutes);
app.use('/api/emails', emailRoutes);

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenue sur l\'API Hemicycle' });
});

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue !' });
});

// Port d'écoute
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 
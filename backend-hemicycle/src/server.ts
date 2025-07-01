import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes

/**
 * ADMIN
 */
import adminUserRoutes from './routes/Admin/userRoutes';

/**
 * AUTH
 */
import authRoutes from './routes/Auth/authRoutes';

/**
 * DEPUTY
 */
import deputyDeputeRoutes from './routes/Deputy/deputeRoutes';
import deputyLawPostRoutes from './routes/Deputy/lawPostRoutes';

/**
 * USER
 */
import userLawPostRoutes from './routes/User/lawPostRoutes';
import userRoutes from './routes/User/userRoutes';
import emailRoutes from './routes/emailRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/admin/users', adminUserRoutes);

app.use('/api/deputy', deputyDeputeRoutes);
app.use('/api/deputy/law-posts', deputyLawPostRoutes);

app.use('/api/users', userRoutes);
app.use('/api/users/law-posts', userLawPostRoutes);

app.use('/api/auth', authRoutes);
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

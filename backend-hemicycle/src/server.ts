import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Logging
import { log, createServiceLogger } from './utils/logger';
import { requestLogger } from './middleware/requestLogger';

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

/**
 * HEALTH
 */
import healthRoutes from './routes/healthRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware (must be before routes)
app.use(requestLogger);

// MongoDB connection
const mongoLogger = createServiceLogger('mongodb');
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => mongoLogger.info('Connecté à MongoDB'))
  .catch((err) => mongoLogger.error('Erreur de connexion à MongoDB', { error: err.message, stack: err.stack }));

// Routes
app.use('/api/admin/users', adminUserRoutes);

app.use('/api/deputy', deputyDeputeRoutes);
app.use('/api/deputy/lawPosts', deputyLawPostRoutes);

app.use('/api/users', userRoutes);
app.use('/api/users/lawPosts', userLawPostRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenue sur l\'API Hemicycle' });
});

// Gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error('Unhandled error in the application', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });
  res.status(500).json({ message: 'Une erreur est survenue !' });
});

// Port d'écoute
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  log.info(`Server started on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

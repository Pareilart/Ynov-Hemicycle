import { Request, Response } from 'express';
import Depute from '../models/Depute';
import { IDepute } from '../types';

// Obtenir tous les députés
export const getAllDeputes = async (req: Request, res: Response): Promise<void> => {
  try {
    const deputes = await Depute.find();
    res.json(deputes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Obtenir un député par ID
export const getDeputeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const depute = await Depute.findById(req.params.id);
    if (depute) {
      res.json(depute);
    } else {
      res.status(404).json({ message: "Député non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Créer un nouveau député
export const createDepute = async (req: Request, res: Response): Promise<void> => {
  const depute = new Depute(req.body);
  try {
    const nouveauDepute = await depute.save();
    res.status(201).json(nouveauDepute);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Mettre à jour un député
export const updateDepute = async (req: Request, res: Response): Promise<void> => {
  try {
    const depute = await Depute.findById(req.params.id);
    if (depute) {
      Object.assign(depute, req.body);
      const deputeMisAJour = await depute.save();
      res.json(deputeMisAJour);
    } else {
      res.status(404).json({ message: "Député non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Supprimer un député
export const deleteDepute = async (req: Request, res: Response): Promise<void> => {
  try {
    const depute = await Depute.findById(req.params.id);
    if (depute) {
      await depute.deleteOne();
      res.json({ message: "Député supprimé" });
    } else {
      res.status(404).json({ message: "Député non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

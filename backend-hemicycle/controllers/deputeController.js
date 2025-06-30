const Depute = require("../models/Depute");

// Obtenir tous les députés
exports.getAllDeputes = async (req, res) => {
  try {
    const deputes = await Depute.find();
    res.json(deputes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un député par ID
exports.getDeputeById = async (req, res) => {
  try {
    const depute = await Depute.findById(req.params.id);
    if (depute) {
      res.json(depute);
    } else {
      res.status(404).json({ message: "Député non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau député
exports.createDepute = async (req, res) => {
  const depute = new Depute(req.body);
  try {
    const nouveauDepute = await depute.save();
    res.status(201).json(nouveauDepute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un député
exports.updateDepute = async (req, res) => {
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
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un député
exports.deleteDepute = async (req, res) => {
  try {
    const depute = await Depute.findById(req.params.id);
    if (depute) {
      await depute.deleteOne();
      res.json({ message: "Député supprimé" });
    } else {
      res.status(404).json({ message: "Député non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

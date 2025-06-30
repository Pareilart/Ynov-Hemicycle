const express = require('express');
const router = express.Router();
const deputeController = require('../controllers/deputeController');

// Routes pour les députés
router.get('/', deputeController.getAllDeputes);
router.get('/:id', deputeController.getDeputeById);
router.post('/', deputeController.createDepute);
router.put('/:id', deputeController.updateDepute);
router.delete('/:id', deputeController.deleteDepute);

module.exports = router; 
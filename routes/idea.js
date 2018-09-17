const express = require('express');
const router = express.Router();

const User = require('../models/user');

const IdeaController = require('../controllers/idea');

// router.get('/', IdeaController.getIdeas);
router.get('/:id-:slug', IdeaController.getIdea);
router.get('/add', User.ensureAuthenticated, IdeaController.getAddIdea)
  .post('/add', User.ensureAuthenticated, IdeaController.postCreateIdea);

module.exports = router;

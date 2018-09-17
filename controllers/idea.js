const Idea = require('../models/idea');

const config = require('./../config/main');

const IdeaController = {};

IdeaController.getIdea = (req, res) => {
  Idea.getIdea({id: req.params.id, slug: req.params.slug}, idea => {
    res.render('ideas/view', {idea})
  });
};

IdeaController.getAddIdea = (req, res) => {
  res.render('ideas/add')
};

IdeaController.postCreateIdea = (req, res) => {
  let title = req.body.title,
    text = req.body.text,
    tags = req.body.tags,
    authorId = req.user.id
  ;

  req.checkBody('title', req.i18n_texts.pages.ideas.errors.empty_title).notEmpty();
  req.checkBody('text', req.i18n_texts.pages.ideas.errors.empty_idea).notEmpty();
  req.checkBody('tags', req.i18n_texts.pages.ideas.errors.tags).notEmpty();

  let errors = req.validationErrors();

  console.log(errors);
  if (errors) {
    console.log(errors);
    res.render('ideas/add', {body: req.body, errors})
  } else {
    Idea.createIdea({title, text, tags, authorId}, (result, err) => {
      if (!err && result) {
        res.redirect(`/ideas/${result.insertId}-${config.slufigy(title)}`);
      } else {
        res.render('ideas/add', {body: req.body, error_msg: err.sqlMessage})
      }
    });
  }
};

module.exports = IdeaController;
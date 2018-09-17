const mysql = require('./../bin/mysql');

const config = require('../config/main');

const Idea = {};

Idea.getIdea = async (data, callback) => {
  mysql.select({
    select: 'ideas.id, title, idea, tags, ideas.created_at, followers, comments, status, slug, nickname',
    from: 'ideas',
    join: {
      table: 'users',
      on: 'users.id = ideas.author_id'
    },
    where: `slug = "${data.slug}" AND ideas.id = ${data.id}`
  }).then(result => callback(result[0], null))
    .catch(error => callback(null, error))
};

Idea.createIdea = async (idea, cb) => {
  idea.created_at = new Date();
  mysql.insert({
    into: 'ideas',
    data: {
      title: idea.title,
      idea: idea.text,
      tags: idea.tags,
      author_id: idea.authorId,
      created_at: idea.created_at,
      status: 'Off',
      slug: config.slufigy(idea.title)
    }
  }).then(result => cb(result, null))
    .catch(error => cb(null, null, error));
};

module.exports = Idea;

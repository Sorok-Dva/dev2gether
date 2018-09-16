const conf = require('dotenv').config().parsed;
const pg = require('pg');
const async = require('async');

const state = { pool: null };

const config = {
  user: '',
  database: '',
  password: '',
  host: '',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};

exports.connect = done => {
  state.pool = new pg.Pool(config);
  pg.defaults.ssl = false;
  this.get('SELECT NOW() as now', (err, res) => done(err, res));
};

exports.get = (statements, cb) => {
  let pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));
  pool.connect((err, client, done) => {
    if (!client) return(null, null);
    client.query(statements, (err, res) => {
      done();
      if (err) return cb(err);
      return cb(null, res)
    });
  });
};
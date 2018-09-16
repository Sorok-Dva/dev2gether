const env = require('dotenv').config().parsed;
const stripe = require('stripe')(env.STRIPE_SK_LIVE); // live
const mysql = require('./mysql');
const config = require('../config/main');

exports.createPay = async (payment, req) => new Promise((resolve, reject) => {
  stripe.customers.create({
    email: payment.email,
    source: payment.source
  }).then(customer => {
    stripe.charges.create({
      amount: payment.amount * 100,
      description: payment.description,
      currency: 'eur',
      customer: customer.id
    }).then(charge => {
      mysql.get('site', (err, con) => {
        if (err) config.__w(err);
        let state = 'Canceled';
        let credited = false;
        let count = 0;
        let data = {
          paymentId: charge.id,
          nickname: req.user.identifier,
          token: payment.source,
          state,
          paymentMethod: 'Stripe',
          amount: payment.amount,
          payerId: charge.customer,

          date: new Date(),
          credited,
          count
        };
        con.query('INSERT INTO shop_transactions SET ?', data, (err, result) => {
          con.release();
          return resolve(charge);
        });
      });
    });
  }).catch(error => reject(error));
});
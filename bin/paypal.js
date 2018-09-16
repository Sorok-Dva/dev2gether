const paypal = require('paypal-rest-sdk');
const mysql = require('./mysql');
const config = require('../config/main');


paypal.configure({
  'mode': 'live', // sandbox or live
  'client_id': '',
  'client_secret': ''
});

exports.createPay = async (payment, req) => new Promise((resolve, reject) => {
  paypal.payment.create(payment, (err, payment) => {
    if (err) {
      config.__w(err);
      reject(err);
    }
    else {
      mysql.get('site', (err, con) => {
        config.__w(err);
        let data = {
          nickname: req.user.identifier,
          paymentId: payment.id,
          state: payment.state,
          paymentMethod: payment.payer.payment_method,
          amount: payment.transactions[0].amount.total,
          date: new Date()
        };
        con.query('INSERT INTO shop_transactions SET ?', data, (err, result) => {
          con.release();
          resolve(payment);
        });
      });
    }
  });
});

exports.executePay = async (payerId, paymentId) => new Promise((resolve, reject) => {
  mysql.get('site', (err, con) => {
    if (err) config.__w(error);
    con.query('SELECT * FROM shop_transactions WHERE ?', {paymentId}, (err, result) => {
      con.release();
      const execute_payment_json = {
        'payer_id': payerId,
        'transactions': [{
          'amount': {
            'currency': 'EUR',
            'total': result[0].amount
          }
        }]
      };
      paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
          config.__w(error);
          if (error.response.name === 'PAYMENT_ALREADY_DONE') resolve('Ok');
          else resolve(false);
        }
        return resolve(payment);
      });
    });
  })
});

exports.getTransactionsLogs = async (nickname, callback) => {
  mysql.get('site', (err, con) => {
    if (err) config.__w(err);
    con.query('SELECT * FROM shop_transactions WHERE ? ORDER BY date ASC', {nickname}, (err, result) => {
      con.release();
      return callback(result);
    });
  })
};

exports.updateTransactions = async (paymentId, data, callback) => {
  mysql.get('site', (err, con) => {
    con.query('UPDATE shop_transactions SET ? WHERE paymentId = "' + paymentId + '"', data, (e, r) => {
      con.release();
      return callback(r);
    });
  });
};

exports.cancelTransaction = async (user, callback) => {
  mysql.get('site', (err, con) => {
    con.query('UPDATE shop_transactions SET ? WHERE nickname = "' + user + '" AND state = "created"', {state: 'Canceled'}, (e, r) => {
      console.log(e, r);
      con.release();
      return callback(r);
    });
  });
};

const User = require('../models/user');
const mailer = require('./../bin/mailer');

const IndexController = {};

IndexController.getIndex = (req, res) => {
  if (req.user) {
    res.redirect('/home');
  } else {
    return res.render('index', {layout: 'landing'});
  }
};

IndexController.getRestore = (req, res) => res.render('index');

IndexController.getRegister = (req, res) => res.render('register');

IndexController.getLogin = (req, res) => res.render('login');

IndexController.changeLang = (req, res) => {
  res.cookie('anw_lang', req.params.lang, { maxAge: 900000, httpOnly: false });
  res.redirect('/');
};

IndexController.getHome = (req, res) => res.render('index');

IndexController.postRegister = (req, res) => {
  let email = req.body.email,
    nickname = req.body.nickname,
    password = req.body.password,
    repeatPass = req.body.passwordRepeat,
    ip = req.ip
    ;

  req.checkBody('nickname', req.i18n_texts.pages.register.errors.empty_nickname).notEmpty();
  req.checkBody('email', req.i18n_texts.pages.register.errors.empty_email).notEmpty();
  req.checkBody('email', req.i18n_texts.pages.register.errors.invalid_email).isEmail();
  // req.checkBody('email', req.i18n_texts.pages.register.errors.email_not_matches).equals(repeatEmail);
  req.checkBody('password', req.i18n_texts.pages.register.errors.empty_password).notEmpty();
  // req.checkBody('password', req.i18n_texts.pages.register.errors.password_not_matches).equals(repeatPass);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {body: req.body, errors})
  } else {
    User.createUser({email, nickname, password}, (result, key, err) => {
      if (!err && result) {
        res.redirect('login');
      } else if (err.errno === 1062) {
        res.render('register', {body: req.body, error_msg: err.sqlMessage})
      } else {
        console.log(err);
      }
    });
  }
};

IndexController.postLogin = (req, res) => {
  res.redirect('/');
};

IndexController.getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};

IndexController.postForgot = (req, res) => {
  res.redirect('/?info=reset-password');
};

IndexController.getResetPassword = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      req.flash('error_msg', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('users/reset');
  });
};

IndexController.postResetPassword = (req, res, next) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      req.flash('error_msg', 'Password reset token is invalid or has expired.');
      return res.redirect('back');
    }

    user.password = req.body.password;

    User.resetPassword(user, () => {
      req.logIn(user, err => {
        if (!err) {
          let text = 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n';
          mailer(user.email, 'dev2gether@no-reply.fr', 'Your password has been changed', text);
          req.flash('success_msg', 'Your password has been successfully reset.');
          res.redirect('/game');
        }
      });
    })
  });
};

module.exports = IndexController;

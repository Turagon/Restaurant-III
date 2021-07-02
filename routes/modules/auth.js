const express = require('express')
const users = require('../../models/userData')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { emailVerify, passwordVerify } = require('../../public/javascripts/authValidate.js')
const { ensureAuth, forwardAuth } = require('../../config/pageAuth')

const router = express.Router()

router.get('/', forwardAuth, (req, res) => {
  res.render('auth', {title: 'Authentication', layout: 'loginPage'})
})

router.get('/register', forwardAuth, (req, res) => {
  res.render('register', { title: 'Authentication', layout: 'loginPage' })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true,
  }),
  (req, res) => {
    req.flash('msg', `${req.user.name}`)
    res.redirect('/home')
  }
)

router.post('/register', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  let password = req.body.password
  const password2 = req.body.password2
  let errors = []
  if (!emailVerify(email)) {
    errors.push({ msg: 'the email format is invalid' })
  }
  if (!passwordVerify(password)) {
    errors.push({ msg: 'the password format or length is invalid' })
  }
  if (password !== password2) {
    errors.push({ msg: 'the passwords do not match each other' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      layout: 'loginPage'
    })
  } else {
    users.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'the email is registered already' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: 'loginPage'
          })
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                throw err
              }
              password = hash
              users.create({
                name,
                email,
                password
              })
                .then(users => {
                  req.flash('msg', 'Your registration is successful')
                  res.redirect('/')
                })
                .catch(err => console.log(err))
            })
          })
        }
      })
      .catch(err => console.log(err))
  }
})

module.exports = router

module.exports = router
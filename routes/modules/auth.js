const express = require('express')
const users = require('../../models/userData')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { emailVerify, passwordVerify } = require('../../public/javascripts/authValidate.js')
const { ensureAuth, forwardAuth } = require('../../config/pageAuth')

const router = express.Router()

// login page routing
router.get('/', forwardAuth, (req, res) => {
  res.render('auth', {title: 'Authentication', layout: 'loginPage'})
})

// registration page routing
router.get('/register', forwardAuth, (req, res) => {
  res.render('register', { title: 'Authentication', layout: 'loginPage' })
})

// facebook login routing
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
  })
)

// user logout routing
router.get('/logout', (req, res) => {
  const username = req.user ? req.user.name: 'Sir'
  req.logout()
  req.flash('msg', `${username} You have successfully logout`)
  res.redirect('/')
})

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect('/home')
  }
)

router.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body
  const errors = []
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
              users.create({
                name,
                email,
                password: hash
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
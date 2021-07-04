const strategy = require('passport-local').Strategy
const fbstrategy = require('passport-facebook').Strategy

const bcrypt = require('bcryptjs')
const users = require('../models/userData')

// set local strategy
const localStrategy = new strategy({ usernameField: 'email' }, (email, password, done) => {
  users.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'this email is not registered' })
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      })
    })
    .catch((error) => console.log(error))
})


const facebookStrategy = new fbstrategy(
  {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['displayName', 'email']
  },
  (accessToken, refreshToken, profile, cb) => {
    const {name, email} = profile._json
    users.findOne({email})
    .then(user => {
      if (!user) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(Math.random().toString(20).slice(9), salt, (err, hash) => {
            if (err) throw err
            users.create({
              name,
              email,
              password: hash
            })
            .then(user => {
              return cb(null, user)
            })
            .catch(err => {
              return cb(null, false, { message: 'Ooops! Something wrong, please try again' })
            })
          })
        })
      } else if (user) {
        return cb(null, user)
      }
    })
  }
)

// pack middleware
function passportSet(passport) {
  passport.use(localStrategy)
  passport.use(facebookStrategy)

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    users.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = passportSet
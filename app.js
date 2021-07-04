if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const helpers = require('just-handlebars-helpers')
const methodOverride = require('method-override')
const handlebars = require('handlebars')
const passport = require('passport')
const port = process.env.PORT
const routes = require('./routes')
require('./config/mongoose')

helpers.registerHelpers(handlebars)

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

// Connect flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.msg = req.flash('msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)


app.listen(port, () => {
  console.log('server on')
})
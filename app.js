const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const helpers = require('just-handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const port = 3000

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

helpers.registerHelpers(handlebars)

app.listen(port, () => {
  console.log('server on')
})
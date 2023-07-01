const express = require('express')
const exphbs = require('express-handlebars')
const User = require('./models/user')
const cookieParser = require('cookie-parser')
const sessionIDGenerator = require('./utils/session_id_generator')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  if (sessionID = req.cookies.sessionID) {
    return User.findOne({ sessionID })
            .then(user => {
              res.render('user', { firstName: user.firstName })
            })
  }
  
  return res.render('index')
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  
  return User.findOne({ email, password })
    .then(user => {
      if (!user)
        return false
      
      const sessionID = sessionIDGenerator()
      user.sessionID = sessionID
      const loginUser = new User(user)
      loginUser.save()
      return user
    })
    .then(user => {
      if (!user)
        return res.redirect('/')
      
      return res.cookie('sessionID', user.sessionID).render('user', { firstName: user.firstName })
    })
})

app.get('/logout', (req, res) => {
  return res.clearCookie('sessionID').redirect('/')
})

app.listen(3000, () => {
  console.log('Express is listening on http://localhost:3000')
})
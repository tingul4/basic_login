const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const users = [
 {
   firstName: 'Tony',
   email: 'tony@stark.com',
   password: 'iamironman'
 },
 {
   firstName: 'Steve',
   email: 'captain@hotmail.com',
   password: 'icandothisallday'
 },
 {
   firstName: 'Peter',
   email: 'peter@parker.com',
   password: 'enajyram'
 },
 {
   firstName: 'Natasha',
   email: 'natasha@gamil.com',
   password: '*parol#@$!'
 },
 {
   firstName: 'Nick',
   email: 'nick@shield.com',
   password: 'password'
 }
]

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let loginUser = users.filter(user => 
    user.email === email && user.password === password
  )
  
  if (loginUser.length) {
    return res.render('user', { loginUser })
  } else {
    return res.render('index')
  }
})

app.listen(3000, () => {
  console.log('Express is listening on http://localhost:3000')
})
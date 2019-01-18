require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/auth_controller')
const schedCtrl = require('./controllers/sched_controller')


const {SERVER_PORT, SECRET, CONNECTION_STRING} = process.env

const app = express()
app.use(express.json())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))


massive(CONNECTION_STRING).then(db=> {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log( `Listening on port ${SERVER_PORT}`)
  })
})




//auth

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.get('/auth/logout', authCtrl.logout)



//schedule

app.get('/api/appts', schedCtrl.getAllClientAppts)

app.get('/api/avail', schedCtrl.getAvailability)

app.post('/api/appt', schedCtrl.createAppt)


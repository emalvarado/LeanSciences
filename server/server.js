require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/auth_controller')
const schedCtrl = require('./controllers/sched_controller')


const { SERVER_PORT, SECRET, CONNECTION_STRING, STRIPE_SECRET_KEY, ENVIRONMENT } = process.env
var stripe = require("stripe")(STRIPE_SECRET_KEY)

const app = express()
app.use(express.json())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))

// app.use(async (req, res, next) => {
//   // console.log(ENVIRONMENT)
//   if (ENVIRONMENT === 'development') {
//     const db = req.app.get('db')
//     const userData = await db.set_data()
//     req.session.user = userData[0]
//     next()
//   } else {
//     next()
//   }
// })



massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
  })
})




//auth

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.get('/auth/logout', authCtrl.logout)

app.get('/api/user', (req, res)=> {
// console.log(req.session)
if(req.session.user) {
  res.send(req.session.user)
}else {
  res.sendStatus(404)
}
})





//schedule

app.get('/api/appts', schedCtrl.getAllClientAppts)

app.get('/api/avail', schedCtrl.getAvailability)

app.get('/api/appts/:user_id', schedCtrl.getSingleClientAppt)

app.post('/api/appt', schedCtrl.createAppt)

app.put('/api/appt/:appt_id', schedCtrl.editComment)

app.delete('/api/appt/:appt_id', schedCtrl.deleteAppt)

app.put('/api/appts', schedCtrl.updateAvailability)



//stripe

app.post("/payment", async (req, res) => {
  // console.log(req.body.token, req.body.amount)
  try {
    let { status } = await stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd"
    });
    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

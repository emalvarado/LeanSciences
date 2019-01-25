require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/auth_controller')
const schedCtrl = require('./controllers/sched_controller')
const nodemailer = require("nodemailer")
const credentials = require('../credentials')
// const path = require('path')




const { SERVER_PORT, SECRET, CONNECTION_STRING, STRIPE_SECRET_KEY, ENVIRONMENT, EMAIL, EMAILPASS } = process.env
var stripe = require("stripe")(STRIPE_SECRET_KEY)

const app = express()
app.use(express.json())
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use( express.static( `${__dirname}/../build` ) );

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


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })

//auth

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.get('/auth/logout', authCtrl.logout)

app.get('/api/user', (req, res) => {
  // console.log(req.session)
  if (req.session.user) {
    res.send(req.session.user)
  } else {
    res.sendStatus(404)
  }
})





//schedule

app.get('/api/appts', schedCtrl.getAllClientAppts)

app.get('/api/avail/:date', schedCtrl.getAvailability)

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


//nodemailer

app.post('/send', async (req, res) => {
  // console.log(credentials.yahooEmail)
  // console.log(req.body)
  const output = `
  <p> You have  new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p> ${req.body.message}</p>
  `
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: credentials.yahooEmail.user,
      pass: credentials.yahooEmail.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: credentials.yahooEmail.user , // sender address
    to: credentials.yahooEmail.user, // list of receivers
    subject: "LeanSciences Contact Request", // Subject line
    text: "", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).send({message: 'Email has been sent'})
})

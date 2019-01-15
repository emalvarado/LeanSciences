const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const {first, last, email, password, phone} = req.body
    const user = await db.find_user({email})
    if(user[0]) {
      return res.status(200).send({message: 'Email already in use.'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = await db.create_user({email, hash, first, last, phone})
    req.session.user = {id: newUser[0].id, email:newUser[0].user_email, first: newUser[0].user_first, last: newUser[0].user_last, phone: newUser[0].user_phone, admin: newUser[0].admin}
    res.status(201).send({message: 'Logged in', userData: req.session.user, loggedIn: true})
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const{email, password} = req.body
    const user = await db.find_user({email})
    if(!user[0]) {
      return res.status(200).send({message: 'Email not found.'})
    }
    const result = bcrypt.compareSync(password, user[0].user_hash)
    if(!result) {
      return res.status(200).send({message: 'Password incorrect.'})
    }
    req.session.user = {id: user[0].id, email:user[0].user_email, first: user[0].user_first, last: user[0].user_last, phone: user[0].user_phone, admin: user[0].admin}
    res.status(200).send({message: 'logged in', userData: req.session.user, loggedIn: true})
  }

}
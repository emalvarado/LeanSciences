module.exports = {
  getAllClientAppts: async (req, res) => {
    const db = req.app.get('db')
    const appts = await db.get_all_client_appt()
    // console.log(appts)
    res.status(200).send(appts)

  },

  getAvailability: async (req, res) => {
    const db = req.app.get('db')
    let {date} = req.params
    date = decodeURI(date)
    console.log(date)
    const avail = await db.get_day_avail({date})
    res.status(200).send(avail)
  },

  createAppt: async (req, res) => {
    const db = req.app.get('db')
    const {date, start, end, price, paid, user_id, confirm, comment} = req.body
    const newAppt = await db.create_appt({date, start, end, price, paid, user_id, confirm, comment})
    res.status(200).send(newAppt)
  },

  getSingleClientAppt: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const appts = await db.get_single_client_appts({user_id})
    res.status(200).send(appts)
  },

  editComment: async (req, res) => {
    const db = req.app.get('db')
    const {appt_id} = req.params
    const {comment} = req.body
    const appt = await db.edit_comment({appt_id, comment})
    res.status(200).send(appt)
  },
  deleteAppt: async (req,res) => {
    const db = req.app.get('db')
    const {appt_id} = req.params
    const removed = await db.delete_appt({appt_id})
    res.sendStatus(200)
  },

  updateAvailability: async (req, res) => {
    const db = req.app.get('db')
    const {date, start} = req.body
    // console.log(date, start)
    const update = await db.update_avail({date, start})
    res.status(200).send(update)
  }
}
module.exports = {
  getAllClientAppts: async (req, res) => {
    const db = req.app.get('db')
    const appts = await db.get_all_client_appt()
    // console.log(appts)
    res.status(200).send(appts)

  },

  getAvailability: async (req, res) => {
    const db = req.app.get('db')
    const avail = await db.get_all_avail()
    res.status(200).send(avail)
  },

  createAppt: async (req, res) => {
    const db = req.app.get('db')
    const {date, start, end, price, paid, user_id, confirm} = req.body
    const newAppt = await db.create_appt({date, start, end, price, paid, user_id, confirm})
    res.status(200).send(newAppt)
  }
}
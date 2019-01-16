module.exports = {
  getAllClientAppts: async (req, res) => {
    const db = req.app.get('db')
    const appts = await db.get_all_client_appt()
    res.status(200).send(appts)

  }
}
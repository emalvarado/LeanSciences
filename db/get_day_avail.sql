select a.id, appt_date, appt_start, a.user_id from appointment a
where user_id = 5 and appt_date = $(date)
order by appt_start
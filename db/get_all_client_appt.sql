-- select * from appointment a
-- join users u on a.user_id = u.id
-- where admin is null or admin = false


select a.id, a.appt_date, a.appt_start, a.appt_end, appt_end - appt_start as duration, a.appt_price, a.appt_paid, a.appt_confirmation, a.user_id, u.user_first, u.user_last, u.user_email from appointment a
join users u on a.user_id = u.id
where admin is null or admin = false
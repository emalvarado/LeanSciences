-- select * from appointment a
-- join users u on a.user_id = u.id
-- where admin is null or admin = false




-- select a.id, a.appt_date, a.appt_start, a.appt_end, appt_end - appt_start as duration, a.appt_price, a.appt_paid, a.appt_confirmation, a.user_id, u.user_first, u.user_last, u.user_email, u.user_phone from appointment a
-- join users u on a.user_id = u.id
-- where admin is null or admin = false


-- select a.id, to_char("appt_date", 'mm/dd/yyyy') as appt_date, to_char("appt_start", 'hh12:mm AM') as appt_start, to_char("appt_end", 'hh12:mm AM') as appt_end, appt_end - appt_start as duration, a.appt_price, a.appt_paid, a.appt_confirmation, a.user_id, a.comment, u.user_first, u.user_last, u.user_email, u.user_phone from appointment a
-- join users u on a.user_id = u.id
-- where admin is null or admin = false
-- order by appt_date asc, a.appt_start asc



select a.id, appt_date, appt_start, appt_end, appt_end - appt_start as duration, a.appt_price, a.appt_paid, a.appt_confirmation, a.user_id, a.comment, u.user_first, u.user_last, u.user_email, u.user_phone from appointment a
join users u on a.user_id = u.id
where admin is null or admin = false
order by appt_date asc, a.appt_start asc

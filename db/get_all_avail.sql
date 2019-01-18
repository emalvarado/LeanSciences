-- select a.id, to_char("appt_date", 'mm/dd/yyyy') as appt_date, to_char("appt_start", 'hh12:mm AM') as appt_start, to_char("appt_end", 'hh12:mm AM') as appt_end, a.user_id from appointment a
-- where user_id = 5

select a.id, appt_date, appt_start, appt_end, a.user_id from appointment a
where user_id = 5


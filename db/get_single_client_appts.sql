select * from appointment
where user_id = $(user_id)
order by appt_date asc, appt_start asc;

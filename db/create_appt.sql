INSERT INTO appointment ("appt_date", "appt_start", "appt_end", "appt_price", "appt_paid", "user_id", "appt_confirmation", "comment")
VALUES($(date), $(start), $(end), $(price), $(paid), $(user_id), $(confirm), $(comment))
returning *;

-- select * from appointment
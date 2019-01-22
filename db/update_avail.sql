UPDATE appointment
SET "user_id"= $(user_id)
WHERE appt_date = $(date) and appt_start=$(start)
RETURNING *;

-- UPDATE appointment
-- SET "user_id"= $(user_id), "appt_end"=$(end), "appt_price"=$(price), "appt_paid"=$(paid), "comment"=$(comment) 
-- WHERE appt_date = $(date) and appt_start=$(start)
-- RETURNING *;


DELETE FROM appointment
WHERE appt_date=$(date) and appt_start=$(start)
returning *
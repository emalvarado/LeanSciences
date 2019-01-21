UPDATE appointment
SET "comment"=$(comment)
WHERE "id"=$(appt_id)
RETURNING *;
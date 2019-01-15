insert into users(user_first, user_last, user_email, user_hash, user_phone)
values ($(first), $(last), $(email), $(hash), $(phone))
returning *;
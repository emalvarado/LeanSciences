create table users(
id serial primary key,
user_first varchar(50),
user_last varchar(50),
user_email varchar(150) not null,
user_hash text not null,
user_phone varchar(13),
admin BOOLEAN
);


create table appointment(
id serial primary key,
appt_date date,
appt_start time,
appt_end time,
appt_price decimal(8,2),
appt_paid boolean,
appt_confirmation varchar(30),
user_id integer references users(id)
);



insert into users(user_first, user_last, user_email, user_hash, user_phone, admin)
values ('l', 'a', 'l', 'l', '0', true),
('a','a','a','a','0', FALSE),
('b', 'b', 'b', 'b', '0', false);



insert into appointment(appt_date, appt_start, appt_end, appt_price, appt_paid, appt_confirmation, user_id)
values ('1/1/19', '12:00pm', '6:00pm', 0, true, 'confirmed', 1),
('1/2/19', '12:00pm', '6:00pm', 0, true, 'confirmed', 1),
('1/3/19', '12:00pm', '6:00pm', 0, true, 'confirmed', 1),
('1/3/19', '2:00pm', '4:00pm', 120, true, 'confirmed', 2),
('1/2/19', '12:00pm', '1:00pm', 60, true, 'confirmed', 3);



insert into appointment(appt_date, appt_start, appt_end, appt_price, appt_paid, appt_confirmation, user_id)
values ('1/1/19', '12:00pm', '6:00pm', 0, true, 'confirmed', 5),
('1/2/19', '12:00pm', '6:00pm', 0, true, 'confirmed', 5),
('1/3/19', '12:00pm', '6:00pm', 0, true, 'confirmed', 5),
('1/3/19', '2:00pm', '4:00pm', 120, true, 'confirmed', 6),
('1/2/19', '12:00pm', '1:00pm', 60, true, 'confirmed', 7);
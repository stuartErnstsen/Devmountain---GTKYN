
--TABLE CREATION SEEDS =====================================================
create table gtkyn_users (
  user_id serial primary key,
  first_name varChar(255) not null,
  last_name varChar(255) not null
);

create table users_auth (
  auth_id serial primary key,
  user_id int references gtkyn_users(user_id),
  username varChar(20) not null unique,
  email varChar(255) not null unique,
  hash text not null
);

--DUMMY DATA SEEDS =========================================================
insert into gtkyn_users (
  first_name,
  last_name
)values(
  'tFirst',
  'tLast'
);

insert into users_auth (
  user_id,
  username,
  email,
  hash
)values(
  1,
  'doom',
  'doom@doom.com',
  '123'
);


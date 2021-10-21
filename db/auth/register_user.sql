with ins1 as (
  insert into gtkyn_users (
    first_name,
    last_name
  ) values (
      ${firstNameInput},
      ${lastNameInput}
  ) returning user_id
)

insert into users_auth (
user_id,
username,
email,
hash
)
select ins1.user_id,
${usernameInput},
${emailInput},
${hash}
from ins1
returning *;
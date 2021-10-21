select g.*, ua.* from gtkyn_users g
join users_auth ua on ua.user_id = g.user_id
where lower(username) = LOWER(${usernameOrEmailInput}) or lower(email) = LOWER(${usernameOrEmailInput});
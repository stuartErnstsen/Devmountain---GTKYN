select g.*, ua.username, ua.email from gtkyn_users g
join users_auth ua on ua.user_id = g.user_id
where username = LOWER(${usernameInput}) or email = LOWER(${emailInput});
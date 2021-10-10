select g.*, ua.email, ua.username from gtkyn_users g
join users_auth ua on ua.user_id = g.user_id
where lower(ua.email) = lower(${emailInput});
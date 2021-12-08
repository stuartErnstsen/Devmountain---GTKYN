const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    //Destructuring user inputs off body object
    const { usernameOrEmailInput, passwordInput } = req.body;
    //Bringing in db instance
    const db = req.app.get("db");
    //Checking if user exists in db by username or email
    const [userFound] = await db.auth.find_user_with_auth({
      usernameOrEmailInput,
    });
    console.log(req.body);
    //If user was not found send login errors
    if (!userFound) {
      return res.status(401).send("Username or password is incorrect.");
    }
    //Comparing user password input to user hash in db
    const isAuthenticated = bcrypt.compareSync(passwordInput, userFound.hash);
    //If hash and password do not match send login error
    if (!isAuthenticated) {
      return res.status(401).send("Username or password is incorrect.");
    }

    //Deleting hash/auth_id off user obj before setting user session cookie or sending back to front end
    delete userFound.hash;
    delete userFound.auth_id;

    //Creating user object cookie for user session
    req.session.user = userFound;

    res.status(200).send(req.session.user);
  },
  register: async (req, res) => {
    //Redundancy to make sure reg values are not empty
    const anyValuesEmpty = Object.keys(req.body).some((bodyKey) => {
      return !req.body[bodyKey];
    });

    if (anyValuesEmpty) {
      return res.status(406).send("All fields are required.");
    }
    //Destructuring user inputs off body object
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      usernameInput,
      passwordInput,
    } = req.body;

    //Bringing in instance of db and checking if the username or email already exists before registering
    const db = req.app.get("db");

    //Destructuring first item because query send back an array with a single item
    const [userNameAlreadyExists] = await db.auth.find_user_by_username({
      usernameInput,
    });
    const [emailAlreadyExists] = await db.auth.find_user_by_email({
      emailInput,
    });

    if (userNameAlreadyExists) {
      return res.status(409).send("Username already in use.");
    }
    if (emailAlreadyExists) {
      return res.status(409).send("Email already in use.");
    }

    //Generating hash for new user's password protection
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwordInput, salt);

    //Adding new user to the db
    const [newUser] = await db.auth.register_user({
      firstNameInput,
      lastNameInput,
      usernameInput,
      emailInput,
      hash,
    });

    //Removing hash before setting user info on session or sending it to front end
    delete newUser.hash;
    delete newUser.auth_id;
    //Creating user object cookie for user session
    req.session.user = newUser;
    //Sending user obj back to front end
    res.status(200).send(req.session.user);
  },
  getCurrentUser: (req, res) => {
    console.log(req.session.user);
    const { user } = req.session;
    if (user) {
      return res.status(200).send(req.session.user);
    }
    return res.status(404).send("No user session found!");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send(null);
  },
};

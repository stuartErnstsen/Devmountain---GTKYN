
users = [
    {
        username: 'stu',
        hash_word: '123'
    }
]


module.exports = {
    login: (req, res) => {
        const { usernameInput, passwordInput } = req.body

        const userFound = users.find((user) => user.username === usernameInput)

        if (!userFound) {
            return res.status(401).send('Username or password is incorrect')
        }

        const isAuthenticated = userFound.hash_word === passwordInput

        if (!isAuthenticated) {
            return res.status(401).send('Username or password is incorrect')
        }
        res.status(200).send('User successfully logged in')
    }
}
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Auth = props => {
    const history = useHistory()
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isRegisterActive, setIsRegisterActive] = useState(false)

    const [registerInput, setRegisterInput] = useState({
        usernameInput: '',
        firstNameInput: '',
        lastNameInput: '',
        emailInput: '',
        passwordInput: '',
        verifyPasswordInput: ''
    })

    const handleRegisterOnChange = (e) => {
        setRegisterInput(old => ({ ...old, [e.target.name]: e.target.value }))
    }


    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)

        const body = {
            usernameOrEmailInput: usernameInput,
            passwordInput
        }

        axios.put('/auth/login', body)
            .then(res => history.push('/home'))
            .catch(err => {
                console.error(err.response.data)
                setErrorMessage(err.response.data)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        axios.post('/auth/register', registerInput)
            .then(res => {
                history.push('/home')
            })
            .catch(err => {
                console.error(err)
                setErrorMessage(err.response.data)
            })
    }

    useEffect(() => {
        let msgTimeout;
        if (errorMessage) {
            msgTimeout = setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
        return () => {
            if (msgTimeout) {
                clearTimeout(msgTimeout)
            }
        }
    }, [errorMessage])

    return (
        <section className='auth-container'>
            <h1>GTKYN!</h1>
            <form onSubmit={isRegisterActive ? handleRegister : handleLogin}>
                {errorMessage ? <p>{errorMessage}</p> : null}
                <div className='auth-input-container'>
                    {isRegisterActive ? (
                        <>
                            <input
                                type='text'
                                name='usernameInput'
                                value={registerInput.usernameInput}
                                onChange={handleRegisterOnChange}
                                placeholder='Username'
                                required
                            />
                            <input
                                type='text'
                                name='firstNameInput'
                                value={registerInput.firstNameInput}
                                onChange={handleRegisterOnChange}
                                placeholder='First Name'
                                required
                            />
                            <input
                                type='text'
                                name='lastNameInput'
                                value={registerInput.lastNameInput}
                                onChange={handleRegisterOnChange}
                                placeholder='Last Name'
                                required
                            />
                            <input
                                type='text'
                                name='emailInput'
                                value={registerInput.emailInput}
                                onChange={handleRegisterOnChange}
                                placeholder='Email'
                                required
                            />
                            <input
                                type='text'
                                name='passwordInput'
                                value={registerInput.passwordInput}
                                onChange={handleRegisterOnChange}
                                placeholder='Password'
                                required
                            />
                            <input
                                type='text'
                                name='verifyPasswordInput'
                                value={registerInput.verifyPasswordInput}
                                onChange={handleRegisterOnChange}
                                placeholder='Re-Enter Password'
                                required
                            />
                        </>
                    ) : (
                        <>
                            <input
                                type='text'
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder='USERNAME'
                                required
                            />
                            <input
                                type='password'
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder='PASSWORD'
                                required
                            />
                        </>
                    )}

                </div>
                <button type='submit'>LOGIN</button>
                <p onClick={() => setIsRegisterActive(old => !old)}>SWITCH TO {isRegisterActive ? 'LOGIN' : 'REGISTER'}</p>
            </form>
        </section>
    )
}

export default Auth;

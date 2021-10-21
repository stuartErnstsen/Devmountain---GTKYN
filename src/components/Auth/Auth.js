import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Auth = props => {
    const history = useHistory()
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isRegisterActive, setIsRegisterActive] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)

        const body = {
            usernameInput,
            passwordInput
        }
        axios.put('/auth/login', body)
            .then(res => history.push('/home'))
            .catch(err => {
                console.log(err)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        console.log('REGISTER')

    }

    return (
        <section className='auth-container'>
            <h1>GTKYN!</h1>
            <form onSubmit={isRegisterActive ? handleRegister : handleLogin}>
                <div className='auth-input-container'>
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
                </div>
                <button type='submit'>LOGIN</button>
                <p onClick={() => setIsRegisterActive(old => !old)}>SWITCH TO {isRegisterActive ? 'LOGIN' : 'REGISTER'}</p>
            </form>
        </section>
    )
}

export default Auth;

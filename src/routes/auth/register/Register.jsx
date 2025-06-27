import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import {
	doCreateUserWithEmailAndPassword,
	doSignUpWithGoogle,
} from '../../../firebase/auth'
import './Register.css'

function Register() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [error, setError] = useState(null)
	const { userLoggedIn } = useAuth()
	const [isSigninIn, setIsSigninIn] = useState(false)

	const handleRegister = async e => {
		e.preventDefault()
		try {
			await doCreateUserWithEmailAndPassword(email, password)
			navigate('/')
		} catch (err) {
			setError(err.message)
			console.error('Register failed:', err)
		}
	}

	const onGoogleSignUp = e => {
		e.preventDefault()
		if (!isSigninIn) {
			setIsSigninIn(true)
			doSignUpWithGoogle().catch(error => {
				setErrorMessage(error.message)
				setIsSigninIn(false)
			})
		}
	}
	return (
		<div className='register-page'>
			<div className='register-container'>
				<h2 className='register-title'>Register Page</h2>
				<div className='form-social'>
					<button className='form-social-button' onClick={onGoogleSignUp}>
						<FaGoogle />
						<span>Register with Google</span>
					</button>
					<button className='form-social-button'>
						<FaGithub />
						<span>Register with GitHub</span>
					</button>
				</div>
				<hr />
				<form className='register-form' onSubmit={handleRegister}>
					<input
						type='text'
						placeholder='Enter username'
						required
						value={username}
						onChange={e => setUsername(e.target.value)}
						className='register-form-input'
					/>
					<input
						type='email'
						placeholder='Enter email'
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='register-form-input'
					/>
					<input
						type='password'
						placeholder='Enter password'
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='register-form-input'
					/>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<button type='submit' className='register-form-button'>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register

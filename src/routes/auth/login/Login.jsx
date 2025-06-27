import { FaGithub, FaGoogle } from 'react-icons/fa'
import './Login.css'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import {
	doSignInWithEmailAndPassword,
	doSignInWithGoogle,
} from '../../../firebase/auth'

function Login() {
	const { userLoggedIn } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSigninIn, setIsSigninIn] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const handleLogin = async e => {
		e.preventDefault()
		if (!isSigninIn) {
			setIsSigninIn(true)
			await doSignInWithEmailAndPassword(email, password)
		}
	}

	const onGoogleSignIn = e => {
		e.preventDefault()
		if (!isSigninIn) {
			setIsSigninIn(true)
			doSignInWithGoogle().catch(error => {
				setErrorMessage(error.message)
				setIsSigninIn(false)
			})
		}
	}
	return (
		<div className='login-page'>
			{userLoggedIn && <Navigate to={'/'} replace={true} />}
			<div className='login-container'>
				<h2 className='login-title'>Login Page</h2>
				<div className='form-social'>
					<button className='form-social-button' onClick={onGoogleSignIn}>
						<FaGoogle />
						<span>Login with Google</span>
					</button>
					<button className='form-social-button'>
						<FaGithub />
						<span>Login with GitHub</span>
					</button>
				</div>
				<hr />
				<form className='login-form' onSubmit={handleLogin}>
					<input
						type='email'
						placeholder='Enter email'
						required
						className='login-form-input'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Enter password'
						required
						className='login-form-input'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					{errorMessage && (
						<span className='error-message'>{errorMessage}</span>
					)}
					<button type='submit' className='login-form-button'>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login

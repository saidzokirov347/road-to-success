import { FaGithub, FaGoogle } from 'react-icons/fa'
import './Login.css'

import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
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
			try {
				await doSignInWithEmailAndPassword(email, password)
			} catch (error) {
				setErrorMessage(error.message)
				setIsSigninIn(false)
			}
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
				<h2 className='login-title'>Sign in</h2>
				<div className='form-social'>
					<button className='form-social-button' onClick={onGoogleSignIn}>
						<FaGoogle />
						<span>Sign in with Google</span>
					</button>
					<button className='form-social-button'>
						<FaGithub />
						<span>Sign in with GitHub</span>
					</button>
				</div>
				<hr />
				<form className='login-form' onSubmit={handleLogin}>
					<input
						type='email'
						placeholder='Email'
						required
						className='login-form-input'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						required
						className='login-form-input'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					{errorMessage && (
						<span className='error-message'>{errorMessage}</span>
					)}
					<button type='submit' className='login-form-button'>
						Sign in
					</button>
				</form>
				<hr />
				<span>
					Don't have an account? <Link to={'/register'}>Sign up</Link>
				</span>
			</div>
		</div>
	)
}

export default Login

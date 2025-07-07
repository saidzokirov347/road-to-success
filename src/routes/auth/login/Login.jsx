import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext' // Update this path
import {
	doSignInWithEmailAndPassword,
	doSignInWithGoogle,
} from '../../../firebase/auth' // Update this path
import { showToast } from '../../../utils/toastHelper' // Update this path
import './Login.css'

export default function Login() {
	const { userLoggedIn } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSigninIn, setIsSigninIn] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const handleLogin = async e => {
		e.preventDefault()
		if (!isSigninIn) {
			setIsSigninIn(true)
			try {
				await doSignInWithEmailAndPassword(email, password)
				showToast.successAuth()
			} catch (error) {
				showToast.errorAuth(error.message)
				setErrorMessage(error.message)
				setIsSigninIn(false)
			}
		}
	}

	const onGoogleSignIn = async e => {
		e.preventDefault()
		if (!isSigninIn) {
			setIsSigninIn(true)
			try {
				await doSignInWithGoogle()
				showToast.successAuth()
			} catch (error) {
				showToast.errorAuth(error.message)
				setErrorMessage(error.message)
				setIsSigninIn(false)
			}
		}
	}

	if (userLoggedIn) return <Navigate to='/profile' replace />

	return (
		<div className='login-container'>
			<div className='login-card'>
				<button className='back-button' onClick={() => window.history.back()}>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
						<path
							d='M19 12H5M12 19L5 12L12 5'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>

				<div className='login-header'>
					<h1>{"Let's Sign you in."}</h1>
					<p className='welcome-text'>Welcome back</p>
					<p className='missed-text'>{"You've been missed!"}</p>
				</div>

				<form className='login-form' onSubmit={handleLogin}>
					<div className='form-group'>
						<label htmlFor='username'>Username or Email</label>
						<input
							type='email'
							id='username'
							name='username'
							placeholder='Enter Username or Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							disabled={isSigninIn}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<div className='password-input-container'>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								name='password'
								placeholder='Enter Password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								disabled={isSigninIn}
							/>
							<button
								type='button'
								className='password-toggle'
								onClick={() => setShowPassword(!showPassword)}
							>
								<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
									{showPassword ? (
										<path
											d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									) : (
										<path
											d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									)}
								</svg>
							</button>
						</div>
					</div>

					{errorMessage && <div className='error-message'>{errorMessage}</div>}

					<div className='divider'>
						<span>or</span>
					</div>

					<div className='social-login'>
						<button
							type='button'
							className='social-button'
							onClick={onGoogleSignIn}
							disabled={isSigninIn}
						>
							<FaGoogle size={24} />
							<span>Sign In Via Google</span>
						</button>
					</div>

					<div className='register-link'>
						<span>{"Don't have an account ?"} </span>
						<Link to='/register'>Register</Link>
					</div>

					<button type='submit' className='login-button' disabled={isSigninIn}>
						{isSigninIn ? 'Signing In...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	)
}

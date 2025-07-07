import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import {
	doCreateUserWithEmailAndPassword,
	doSignUpWithGoogle,
} from '../../../firebase/auth'
import { showToast } from '../../../utils/toastHelper'
import './Register.css'

export default function Register() {
	const navigate = useNavigate()
	const { userLoggedIn } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const [username, setUsername] = useState('')
	const [name, setName] = useState('')
	const [bio, setBio] = useState('')
	const [profileImage, setProfileImage] = useState('')

	const [isSigningUp, setIsSigningUp] = useState(false)
	const [error, setError] = useState(null)

	const handleRegister = async e => {
		e.preventDefault()
		if (!isSigningUp) {
			setIsSigningUp(true)
			try {
				await doCreateUserWithEmailAndPassword(email, password, {
					username,
					name,
					bio,
					profileImage,
				})
				showToast.successAuth()
				navigate('/profile')
			} catch (err) {
				setError(err.message)
				showToast.errorAuth(err.message)
				setIsSigningUp(false)
			}
		}
	}

	const onGoogleSignUp = async e => {
		e.preventDefault()
		if (!isSigningUp) {
			setIsSigningUp(true)
			try {
				await doSignUpWithGoogle(bio)
				showToast.successAuth()
				navigate('/profile')
			} catch (error) {
				setError(error.message)
				showToast.errorAuth(error.message)
				setIsSigningUp(false)
			}
		}
	}

	return (
		<div className='register-wrapper'>
			<div className='register-card'>
				<h1 className='register-title'>Create Your Account</h1>

				<form className='register-form' onSubmit={handleRegister}>
					<div className='form-group'>
						<label>Username</label>
						<input
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value.toLowerCase())}
							placeholder='Username'
							required
							disabled={isSigningUp}
						/>
					</div>

					<div className='form-group'>
						<label>Full Name</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Your Name'
							disabled={isSigningUp}
						/>
					</div>

					<div className='form-group'>
						<label>Email</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='Email Address'
							required
							disabled={isSigningUp}
						/>
					</div>

					<div className='form-group'>
						<label>Password</label>
						<div className='password-input-container'>
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='••••••••'
								required
								disabled={isSigningUp}
							/>
							<button
								type='button'
								className='password-toggle'
								onClick={() => setShowPassword(prev => !prev)}
							>
								{showPassword ? '🙈' : '👁️'}
							</button>
						</div>
					</div>

					<div className='form-group'>
						<label>Bio</label>
						<textarea
							value={bio}
							onChange={e => setBio(e.target.value)}
							placeholder='Tell us about yourself...'
							rows={3}
							disabled={isSigningUp}
						></textarea>
					</div>

					{error && <div className='error-message'>{error}</div>}

					<button
						type='submit'
						className='register-button'
						disabled={isSigningUp}
					>
						{isSigningUp ? 'Creating Account...' : 'Sign Up'}
					</button>
				</form>

				<div className='divider'>
					<span>or</span>
				</div>

				<div className='social-login'>
					<button
						className='social-button'
						onClick={onGoogleSignUp}
						disabled={isSigningUp}
					>
						<FaGoogle />
						<span>Sign Up Via Google</span>
					</button>
				</div>

				<p className='login-redirect'>
					Already have an account? <Link to='/login'>Sign In</Link>
				</p>
			</div>
		</div>
	)
}

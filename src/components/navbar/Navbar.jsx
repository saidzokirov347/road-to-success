import { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { GiPineTree } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'
import useRedirectToLogin from '../../hooks/useRedirectToLogin'
import './Navbar.css'

export function Navbar() {
	const location = useLocation()
	const { currentUser } = useAuth()
	const [navOpen, setNavOpen] = useState(false)

	useRedirectToLogin(!currentUser)
	if (!currentUser) return null

	const isUserProfile =
		location.pathname.startsWith('/user/') ||
		location.pathname === '/profile' ||
		location.pathname.includes('/vocabulary/')

	const isQuizPage = location.pathname.includes('/quiz/')
	if (isQuizPage) return null

	const handleLogout = async () => {
		await doSignOut()
	}

	const navLinks = (
		<>
			<Link to='/' className={location.pathname === '/' ? 'active' : ''}>
				Home
			</Link>
			<Link
				to='/vocabulary'
				className={location.pathname === '/vocabulary' ? 'active' : ''}
			>
				Vocabulary
			</Link>
			<Link
				to='/reading'
				className={location.pathname === '/reading' ? 'active' : ''}
			>
				Reading
			</Link>
			<Link
				to='/listening'
				className={location.pathname === '/listening' ? 'active' : ''}
			>
				Listening
			</Link>
			<Link
				to='/speaking'
				className={location.pathname === '/speaking' ? 'active' : ''}
			>
				Speaking
			</Link>
			<Link
				to='/writing'
				className={location.pathname === '/writing' ? 'active' : ''}
			>
				Writing
			</Link>
		</>
	)

	return (
		<>
			<div className='navbar'>
				<div className='navbar-container'>
					<header className='navbar-header'>
						<Link to='/' className='navbar-header-logo'>
							<GiPineTree size={50} />
							<p>
								<em>IELTS Tips & Strategy Hub</em>
							</p>
						</Link>

						<div className='navbar-header-profile desktop-only'>
							<div className='navbar-profile-info'>
								<span className='navbar-profile-name'>
									{currentUser.displayName || currentUser.email}
								</span>
								<img
									src={currentUser.photoURL || '/men-avatar.jpg'}
									alt='Profile'
									className='navbar-profile-avatar'
								/>
							</div>

							<div className='dropdown-menu'>
								<div className='dropdown-menu-wrapper'>
									<Link to='/profile' className='dropdown-menu-link'>
										<FaRegUser />
										<span>Profile</span>
									</Link>
									<button
										onClick={handleLogout}
										className='dropdown-menu-button'
									>
										Log out
									</button>
								</div>
							</div>
						</div>

						<button
							className='navbar-toggle'
							onClick={() => setNavOpen(true)}
							aria-label='Toggle navigation'
						>
							<FiMenu size={28} color='#fff' />
						</button>
					</header>
				</div>
			</div>

			{/* Desktop nav */}
			{!isUserProfile && (
				<nav className='navbar-nav desktop-only'>{navLinks}</nav>
			)}

			{/* Mobile Drawer */}
			<div
				className={`navbar-overlay ${navOpen ? 'open' : ''}`}
				onClick={() => setNavOpen(false)}
			/>

			<div className={`navbar-drawer ${navOpen ? 'open' : ''}`}>
				<div className='navbar-drawer-header' onClick={() => setNavOpen(false)}>
					<Link to='/profile' className='navbar-drawer-profile'>
						<img
							src={currentUser.photoURL || '/men-avatar.jpg'}
							alt='Profile'
							className='navbar-drawer-avatar'
						/>
						<p className='navbar-drawer-name'>
							{currentUser.displayName || currentUser.email}
						</p>
					</Link>
				</div>

				<div className='navbar-drawer-nav'>{navLinks}</div>

				<button className='navbar-drawer-logout' onClick={handleLogout}>
					Log Out
				</button>
			</div>
		</>
	)
}

import { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { GiPineTree } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'
import { navbarLinks } from '../../constants/navbar-links.constants'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'
import useRedirectToLogin from '../../hooks/useRedirectToLogin'
import {
	isSidebarHiddenPage,
	shouldHideNavbarOnPage,
} from '../../utils/routeFlags.utils'
import './Navbar.css'

export function Navbar() {
	const location = useLocation()
	const { currentUser } = useAuth()
	const [navOpen, setNavOpen] = useState(false)

	useRedirectToLogin(!currentUser)
	if (!currentUser) return null

	if (shouldHideNavbarOnPage(location.pathname)) return null

	const handleLogout = async () => {
		await doSignOut()
	}

	const navLinks = (
		<>
			{navbarLinks.map(({ to, label, icon: Icon }) => (
				<Link
					key={to}
					to={to}
					className={location.pathname === to ? 'active' : ''}
				>
					<span className='mobile-icon'>
						<Icon />
					</span>{' '}
					{label}
				</Link>
			))}
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

			{!isSidebarHiddenPage(location.pathname) && (
				<nav className='navbar-nav desktop-only'>
					<div className='navbar-nav-list'>{navLinks}</div>
				</nav>
			)}

			<div
				className={`navbar-overlay ${navOpen ? 'open' : ''}`}
				onClick={() => setNavOpen(false)}
			/>

			<div className={`navbar-drawer ${navOpen ? 'open' : ''}`}>
				<div className='navbar-drawer-header' onClick={() => setNavOpen(false)}>
					<Link to='/profile' className='navbar-drawer-profile'>
						<div className='navbar-drawer-avatar-wrapper'>
							<div className='navbar-drawer-avatar'>
								<img
									src={currentUser.photoURL || '/men-avatar.jpg'}
									alt='Profile'
								/>
							</div>
						</div>
						<p className='navbar-drawer-name'>
							{currentUser.displayName || currentUser.email}
						</p>
						<span className='navbar-drawer-email'>{currentUser.email}</span>
					</Link>
				</div>
				<hr />
				<div className='navbar-drawer-nav'>{navLinks}</div>

				<button className='navbar-drawer-logout' onClick={handleLogout}>
					Log Out
				</button>
			</div>
		</>
	)
}

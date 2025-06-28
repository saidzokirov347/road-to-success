import { FaRegUser } from 'react-icons/fa'
import { GiPineTree } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'
import useRedirectToLogin from '../../hooks/useRedirectToLogin'
import './Navbar.css'

export function Navbar() {
	const location = useLocation()
	const { currentUser } = useAuth()
	useRedirectToLogin(!currentUser)

	if (!currentUser) return null

	const handleLogout = async () => {
		await doSignOut()
	}

	return (
		<div className='navbar'>
			<header className='navbar-header'>
				<Link to={'/'} className='container navbar-header-logo'>
					<GiPineTree size={50} />
					<p>
						<em>IELTS Tips & Strategy Hub</em>
					</p>
				</Link>

				<div className='container navbar-header-profile'>
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
							<Link to={'/profile'} className='dropdown-menu-link'>
								<FaRegUser />
								<span>Profile</span>
							</Link>
							<button onClick={handleLogout} className='dropdown-menu-button'>
								Log out
							</button>
						</div>
					</div>
				</div>
			</header>

			<nav className='navbar-nav'>
				<Link to='/' className={location.pathname === '/' ? 'active' : ''}>
					Home
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
			</nav>
		</div>
	)
}

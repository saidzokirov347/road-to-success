import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Footer } from './componenets/footer/Footer'
import { Navbar } from './componenets/navbar/Navbar'
import Login from './routes/auth/login/Login'
import ProtectedRoute from './routes/auth/ProtectedRoute'
import Register from './routes/auth/register/Register'
import { Home } from './routes/home/Home'
import { Listening } from './routes/listening/Listening'
import { Profile } from './routes/profile/Profile'
import PublicProfile from './routes/public-profile/PublicProfile'
import { Reading } from './routes/reading/Reading'
import { Speaking } from './routes/speaking/Speaking'
import { Writing } from './routes/writing/Writing'

function App() {
	const location = useLocation()
	return (
		<div>
			{location.pathname !== '/login' && <Navbar />}
			<Routes>
				<Route path='/' element={<ProtectedRoute element={<Home />} />} />
				<Route
					path='/reading'
					element={<ProtectedRoute element={<Reading />} />}
				/>
				<Route
					path='/listening'
					element={<ProtectedRoute element={<Listening />} />}
				/>
				<Route
					path='/speaking'
					element={<ProtectedRoute element={<Speaking />} />}
				/>
				<Route
					path='/writing'
					element={<ProtectedRoute element={<Writing />} />}
				/>
				<Route
					path='/profile'
					element={<ProtectedRoute element={<Profile />} />}
				/>
				<Route
					path='/user/:id'
					element={<ProtectedRoute element={<PublicProfile />} />}
				/>

				<Route
					path='/login'
					element={<ProtectedRoute element={<Login />} requireAuth={false} />}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRoute element={<Register />} requireAuth={false} />
					}
				/>
			</Routes>

			<Footer />
			<ToastContainer
				position='top-right'
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</div>
	)
}

export default App

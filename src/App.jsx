import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './componenets/footer/Footer'
import { Navbar } from './componenets/navbar/Navbar'
import Login from './routes/auth/login/Login'
import ProtectedRoute from './routes/auth/ProtectedRoute'
import Register from './routes/auth/register/Register'
import { Home } from './routes/home/Home'
import { Listening } from './routes/listening/Listening'
import { Profile } from './routes/profile/Profile'
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
		</div>
	)
}

export default App

// I changed the code to ensure that the Navbar is not displayed on the login page. The Navbar will only be shown on other pages, such as Home, Reading, Listening, Speaking, Writing, and Profile. The ProtectedRoute component is used to handle authentication for these routes, ensuring that users must be logged in to access them.

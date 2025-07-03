import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Footer } from './components/footer/Footer'
import { Navbar } from './components/navbar/Navbar'
import Login from './routes/auth/login/Login'
import ProtectedRoute from './routes/auth/ProtectedRoute'
import Register from './routes/auth/register/Register'
import { Home } from './routes/home/Home'
import { Listening } from './routes/listening/Listening'
import { Profile } from './routes/profile/Profile'
import PublicProfile from './routes/public-profile/PublicProfile'
import QuizPage from './routes/quiz-page/QuizPage'
import Quizzes from './routes/quizzes/Quizzes'
import { Reading } from './routes/reading/Reading'
import { Speaking } from './routes/speaking/Speaking'
import { Writing } from './routes/writing/Writing'

function App() {
	const hideNavbarPaths = ['/login', '/register']
	const isQuizPage = location.pathname.startsWith('/quiz/')
	const shouldHideNavbar =
		hideNavbarPaths.includes(location.pathname) || isQuizPage

	return (
		<div>
			{!shouldHideNavbar && <Navbar />}
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
					path='/user/:username'
					element={<ProtectedRoute element={<PublicProfile />} />}
				/>
				<Route
					path='/quizzes'
					element={<ProtectedRoute element={<Quizzes />} />}
				/>
				<Route
					path='/quiz/:id'
					element={<ProtectedRoute element={<QuizPage />} />}
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

import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Footer, Navbar } from './components'
import { routes } from './constants/routes.constants'

function App() {
	const location = useLocation()

	const hideNavbarPaths = ['/login', '/register', '/writing-task/:id']
	const isQuizPage = location.pathname.startsWith('/quiz/', '/writing-task/:id')
	const isWritingPage = location.pathname.startsWith('/writing-task/')
	const shouldHideNavbar =
		hideNavbarPaths.includes(location.pathname) || isQuizPage || isWritingPage

	return (
		<div className='app-wrapper'>
			{!shouldHideNavbar && <Navbar />}
			<main className='app-main'>
				<Routes>
					{routes.map(({ path, element }) => (
						<Route key={path} path={path} element={element} />
					))}
				</Routes>
			</main>
			{!shouldHideNavbar && <Footer />}
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

import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Footer, Navbar } from './components'
import { routes } from './constants/routes.constants'
import { useGetWritingTasksQuery } from './store/api/writing-api/writing.api'

function App() {
	const location = useLocation()
	const { data, isLoading } = useGetWritingTasksQuery()

	const hideNavbarPaths = ['/login', '/register']
	const isQuizPage = location.pathname.startsWith('/quiz/')
	const shouldHideNavbar =
		hideNavbarPaths.includes(location.pathname) || isQuizPage

	console.log(data)

	return (
		<div>
			{!shouldHideNavbar && <Navbar />}
			<Routes>
				{routes.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			</Routes>
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

			{/* <MaintenancePage /> */}
		</div>
	)
}

export default App

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useRedirectToLogin = (condition = true) => {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const publicPaths = ['/login', '/register']
		if (condition && !publicPaths.includes(location.pathname)) {
			navigate('/login', { replace: true })
		}
	}, [condition, navigate, location])
}

export default useRedirectToLogin

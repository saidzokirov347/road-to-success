import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useRedirectToLogin = (condition = true) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (condition) {
			navigate('/login', { replace: true })
		}
	}, [condition, navigate])
}

export default useRedirectToLogin

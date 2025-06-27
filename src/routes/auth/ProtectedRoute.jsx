import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function ProtectedRoute({
	element,
	redirectTo = '/login',
	requireAuth = true,
}) {
	const { currentUser } = useAuth()

	if (requireAuth && !currentUser) {
		return <Navigate to={redirectTo} replace />
	}
	if (!requireAuth && currentUser) {
		return <Navigate to='/' replace />
	}

	return element
}

export default ProtectedRoute

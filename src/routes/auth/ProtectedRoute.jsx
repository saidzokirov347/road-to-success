import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function ProtectedRoute({
	element,
	redirectTo = '/login',
	requireAuth = true,
}) {
	const { currentUser, loading } = useAuth()

	if (loading) return null

	if (requireAuth && !currentUser) {
		return <Navigate to={redirectTo} replace />
	}
	if (!requireAuth && currentUser) {
		return <Navigate to='/profile' replace />
	}
	return element
}

export default ProtectedRoute

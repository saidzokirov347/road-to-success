import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function ProtectedRoute({
	element,
	redirectTo = '/login',
	requireAuth = true,
}) {
	const { currentUser, loading } = useAuth()

	// Wait until Firebase has checked auth state
	if (loading) return null // or a spinner like <div>Loading...</div>

	if (requireAuth && !currentUser) {
		return <Navigate to={redirectTo} replace />
	}
	if (!requireAuth && currentUser) {
		return <Navigate to='/' replace />
	}

	return element
}

export default ProtectedRoute

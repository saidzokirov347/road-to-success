import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'

function ProtectedRoute({
	element,
	redirectTo = '/login',
	requireAuth = true,
}) {
	const { currentUser, loading: authLoading } = useAuth()
	const [profileLoading, setProfileLoading] = useState(true)
	const [hasUsername, setHasUsername] = useState(true)
	const location = useLocation()

	useEffect(() => {
		const checkUsername = async () => {
			if (!currentUser) {
				setProfileLoading(false)
				return
			}
			const ref = doc(db, 'users', currentUser.uid)
			const snapshot = await getDoc(ref)
			const data = snapshot.data()
			setHasUsername(!!data?.username?.trim())
			setProfileLoading(false)
		}

		if (currentUser) checkUsername()
		else setProfileLoading(false)
	}, [currentUser])

	if (authLoading || profileLoading) return null

	if (requireAuth && !currentUser) {
		return <Navigate to={redirectTo} replace />
	}

	if (
		requireAuth &&
		currentUser &&
		!hasUsername &&
		location.pathname !== '/profile'
	) {
		return <Navigate to='/profile' replace />
	}

	if (!requireAuth && currentUser) {
		return <Navigate to='/profile' replace />
	}

	return element
}

export default ProtectedRoute

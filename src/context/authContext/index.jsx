import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/firebase'

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	const [loading, setLoading] = useState(true)

	// 👇 ADD THIS
	const [usernameUpdatedAt, setUsernameUpdatedAt] = useState(Date.now())
	const triggerUsernameUpdate = () => setUsernameUpdatedAt(Date.now())

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser)
		return unsubscribe
	}, [])

	async function initializeUser(user) {
		if (user) {
			setCurrentUser({ ...user })
			setUserLoggedIn(true)
		} else {
			setCurrentUser(null)
			setUserLoggedIn(false)
		}
		setLoading(false)
	}

	const value = {
		currentUser,
		userLoggedIn,
		loading,
		usernameUpdatedAt, // 👈 expose this
		triggerUsernameUpdate, // 👈 expose this
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

// hooks/useTopUsers.js
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

export function useTopUsers() {
	const [users, setUsers] = useState([])
	const [lastDoc, setLastDoc] = useState(null)
	const [hasMore, setHasMore] = useState(true)
	const [initialLoaded, setInitialLoaded] = useState(false)

	const fetchUsers = async (count = 15, isInitial = false) => {
		let q = query(collection(db, 'users'), orderBy('exp', 'desc'), limit(count))

		if (!isInitial && lastDoc) {
			q = query(
				collection(db, 'users'),
				orderBy('exp', 'desc'),
				startAfter(lastDoc),
				limit(count)
			)
		}

		const snapshot = await getDocs(q)
		const newUsers = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))

		// Avoid duplicates by filtering already fetched user IDs
		setUsers(prev => {
			const existingIds = new Set(prev.map(u => u.id))
			const filtered = newUsers.filter(u => !existingIds.has(u.id))
			return [...prev, ...filtered]
		})

		if (snapshot.docs.length < count) {
			setHasMore(false)
		} else {
			setLastDoc(snapshot.docs[snapshot.docs.length - 1])
		}

		if (isInitial) setInitialLoaded(true)
	}

	useEffect(() => {
		if (!initialLoaded) fetchUsers(5, true)
	}, [initialLoaded])

	return { users, hasMore, fetchUsers }
}

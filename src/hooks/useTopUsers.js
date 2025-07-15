import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

export function useTopUsers(teacher) {
	const [allUsers, setAllUsers] = useState([])
	const [visibleUsers, setVisibleUsers] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(true)
	const [batchSize, setBatchSize] = useState(5)

	useEffect(() => {
		const fetchUsers = async () => {
			if (!teacher) return

			const q = query(collection(db, 'users'), where('teacher', '==', teacher))
			const snapshot = await getDocs(q)

			const users = snapshot.docs
				.map(doc => {
					const data = doc.data()
					const exp =
						(data.listeningExp || 0) +
						(data.readingExp || 0) +
						(data.writingExp || 0) +
						(data.speakingExp || 0)

					return {
						id: doc.id,
						...data,
						exp,
					}
				})
				.filter(user => user.username !== 'ظ')
				.sort((a, b) => b.exp - a.exp)

			setAllUsers(users)
			setVisibleUsers(users.slice(0, 5))
			setHasMore(users.length > 5)
			setLoading(false)
		}

		fetchUsers()
	}, [teacher])

	const loadMore = () => {
		const nextBatch = allUsers.slice(
			visibleUsers.length,
			visibleUsers.length + 10
		)
		const updatedVisible = [...visibleUsers, ...nextBatch]
		setVisibleUsers(updatedVisible)
		setHasMore(updatedVisible.length < allUsers.length)
	}

	return { users: visibleUsers, hasMore, loadMore, loading }
}

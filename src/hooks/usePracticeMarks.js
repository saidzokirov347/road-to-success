import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { db } from '../firebase/firebase'

export function usePracticeMarks(category) {
	const { currentUser } = useAuth()
	const [marks, setMarks] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMarks = async () => {
			if (!currentUser) return

			const userRef = doc(db, 'users', currentUser.uid)
			const userSnap = await getDoc(userRef)
			if (!userSnap.exists()) return

			const data = userSnap.data()
			const sectionMarks = data[`${category}Marks`] || {}

			setMarks({ [category]: sectionMarks })
			setLoading(false)
		}

		fetchMarks()
	}, [currentUser, category])

	const handleMark = async (mark, dayKey) => {
		if (!currentUser) return

		const userRef = doc(db, 'users', currentUser.uid)
		await updateDoc(userRef, {
			[`${category}Marks.${dayKey}`]: mark,
		})

		setMarks(prev => {
			const updated = { ...(prev[category] || {}), [dayKey]: mark }
			return { ...prev, [category]: updated }
		})
	}

	return { marks, handleMark, loading }
}

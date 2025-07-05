// hooks/usePracticeMarks.js
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { addExpToUser } from '../firebase/exp'
import { db } from '../firebase/firebase'

export function usePracticeMarks(category = 'listening') {
	const { currentUser } = useAuth()
	const [marks, setMarks] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMarks = async () => {
			if (!currentUser) return

			const userRef = doc(db, 'users', currentUser.uid)
			const snap = await getDoc(userRef)

			if (snap.exists()) {
				const data = snap.data()
				setMarks(data[`${category}Marks`] || {})
			}

			setLoading(false)
		}

		fetchMarks()
	}, [currentUser, category])

	const handleMark = async (mark, dayKey) => {
		if (!currentUser) return

		const existing = marks[dayKey]
		const newMark = existing ? { ...existing, ...mark } : mark

		const updatedMarks = { ...marks, [dayKey]: newMark }
		setMarks(updatedMarks)

		await updateDoc(doc(db, 'users', currentUser.uid), {
			[`${category}Marks`]: updatedMarks,
		})

		// Only add EXP the first time user checks '✅'
		if (!existing && mark.emoji === '✅') {
			await addExpToUser(currentUser.uid, 25)
		}
	}

	return { marks, loading, handleMark }
}

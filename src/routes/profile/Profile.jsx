// Profile.jsx
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'

export function Profile() {
	const { currentUser } = useAuth()
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(false)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		if (!currentUser) return

	// 		const ref = doc(db, 'users', currentUser.uid)
	// 		const snapshot = await getDoc(ref)
	// 		if (snapshot.exists()) {
	// 			setDescription(snapshot.data().description || '')
	// 		}
	// 		setLoading(false)
	// 	}
	// 	fetchData()
	// }, [currentUser])

	const handleSave = async () => {
		if (!currentUser) return

		const ref = doc(db, 'users', currentUser.uid)
		await setDoc(
			ref,
			{
				email: currentUser.email,
				displayName: currentUser.displayName,
				description,
			},
			{ merge: true }
		)
		alert('Profile saved!')
	}

	if (loading) {
		return (
			<div className='container profile'>
				<p>Loading profile...</p>
			</div>
		)
	}

	return (
		<div className='container profile'>
			<h2>Hello, {currentUser.displayName}</h2>
			<textarea
				rows='5'
				value={description}
				onChange={e => setDescription(e.target.value)}
				placeholder='Tell us about yourself...'
			></textarea>
			<br />
			<button onClick={handleSave}>Save Description</button>
		</div>
	)
}

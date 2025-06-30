import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import './PublicProfile.css'

export default function PublicProfile() {
	const { id } = useParams()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			const docRef = doc(db, 'users', id)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setUser(docSnap.data())
			}
		}
		fetchUser()
	}, [id])

	if (!user) return <div>Loading profile...</div>

	return (
		<div className='public-profile'>
			<img
				src={user.profileImage || '/men-avatar.jpg'}
				alt='profile'
				className='public-profile-image'
			/>
			<h2>{user.name}</h2>
			<p>@{user.username}</p>
			<p>{user.bio}</p>
		</div>
	)
}

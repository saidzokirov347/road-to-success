import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicProfileSkeleton } from '../../componenets/public-profile-sketelon/PublicProfileSkeleton'
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

	if (!user) return <PublicProfileSkeleton />

	return (
		<div className='public-profile-wrapper'>
			<div className='public-profile-card'>
				<div className='public-profile-header'>
					<div className='avatar-bg'>
						<img
							src={user.profileImage || '/men-avatar.jpg'}
							alt='profile'
							className='public-profile-image'
						/>
					</div>
				</div>

				<div className='public-profile-info'>
					<h2 className='public-name'>{user.name}</h2>
					<p className='public-username'>@{user.username}</p>
					<p className='public-bio'>{user.bio}</p>
				</div>
			</div>
		</div>
	)
}

import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PublicProfileSkeleton } from '../../componenets/public-profile-sketelon/PublicProfileSkeleton'
import { db } from '../../firebase/firebase'
import './PublicProfile.css'

export default function PublicProfile() {
	const { username } = useParams()
	const [user, setUser] = useState(null)
	const [notFound, setNotFound] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const q = query(
					collection(db, 'users'),
					where('username', '==', username)
				)
				const snapshot = await getDocs(q)

				if (!snapshot.empty) {
					setUser(snapshot.docs[0].data())
				} else {
					setNotFound(true)
				}
			} catch (err) {
				console.error('Error fetching user:', err)
				setNotFound(true)
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [username])

	if (loading) return <PublicProfileSkeleton />
	if (notFound) return <Navigate to='/not-found' replace />

	const exp = user.exp || 0
	const level = user.level || Math.floor(exp / 1000) + 1
	const expProgress = Math.min((exp % 1000) / 10, 100)

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

					<div className='public-rank-info'>
						<p className='public-level'>Level {level}</p>
						<div className='public-progress-bar'>
							<div
								className='public-progress-fill'
								style={{ width: `${expProgress}%` }}
							></div>
						</div>
						<small className='public-exp-text'>{exp % 1000} / 1000 EXP</small>
					</div>
				</div>
			</div>
		</div>
	)
}

import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import Calendar from '../../componenets/calendar/Calendar'
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

	const levelThresholds = [0, 1000, 2000, 3000, 4000, 5000]

	const getCorrectLevel = exp => {
		let calculatedLevel = 1
		for (let i = 1; i < levelThresholds.length; i++) {
			if (exp >= levelThresholds[i]) {
				calculatedLevel = i + 1
			}
		}
		return Math.min(calculatedLevel, 5)
	}

	const getMaxExpForLevel = level => {
		if (level === 1) return 1000
		if (level === 2) return 2000
		if (level === 3) return 3000
		if (level === 4) return 4000
		return 5000
	}

	const getMinExpForLevel = level => {
		if (level === 1) return 0
		if (level === 2) return 1000
		if (level === 3) return 2000
		if (level === 4) return 3000
		return 4000
	}

	const exp = user.exp || 0
	const storedLevel = user.level || 1
	const level = getCorrectLevel(exp)

	const minExp = getMinExpForLevel(level)
	const maxExp = getMaxExpForLevel(level)
	const expInLevel = exp - minExp
	const expRange = maxExp - minExp
	const progress = Math.min((expInLevel / expRange) * 100, 100)

	const listeningMarks = user.listeningMarks || {}
	const readingMarks = user.readingMarks || {}

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
								className={`public-progress-fill level-${Math.min(level, 5)}`}
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<small className='public-exp-text'>
							{exp} / {maxExp} EXP
						</small>
					</div>
				</div>
			</div>

			<div className='public-profile-calendar-container'>
				<Calendar
					title='📅 Listening Practice History'
					marks={listeningMarks}
				/>
			</div>

			<div className='public-profile-calendar-container'>
				<Calendar title='📅 Reading Practice History' marks={readingMarks} />
			</div>
		</div>
	)
}

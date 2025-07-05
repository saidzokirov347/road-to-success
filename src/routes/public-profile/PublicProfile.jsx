import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import Calendar from '../../components/calendar/Calendar'
import { getUserByUsername } from '../../firebase/user'
import { getCorrectLevel, getExpRangeForLevel } from '../../utils/exp'

import './PublicProfile.css'

export default function PublicProfile() {
	const { username } = useParams()
	const [user, setUser] = useState(null)
	const [notFound, setNotFound] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const fetchUser = async () => {
			const data = await getUserByUsername(username)
			if (data) {
				setUser(data)
			} else {
				setNotFound(true)
			}
			setLoading(false)
		}
		fetchUser()
	}, [username])

	if (loading) {
		return (
			<div className='public-profile-loader-container'>
				<div className='public-profile-loader'></div>
			</div>
		)
	}
	if (notFound) return <Navigate to='/not-found' replace />

	const exp = user.exp || 0
	const level = getCorrectLevel(exp)
	const { minExp, maxExp } = getExpRangeForLevel(level)
	const expInLevel = exp - minExp
	const expRange = maxExp - minExp
	const progress = Math.min((expInLevel / expRange) * 100, 100)

	const listeningMarks = user.listeningMarks || {}
	const readingMarks = user.readingMarks || {}
	const speakingMarks = user.speakingMarks || {}

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
			<div className='public-profile-calendar-container'>
				<Calendar title='📅 Speaking Practice History' marks={speakingMarks} />
			</div>
		</div>
	)
}

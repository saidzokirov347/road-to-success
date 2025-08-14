import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { IELTSRadarChart } from '../../components'
import { useGetUserByUsernameQuery } from '../../store/api/users-api/users.api'
import { getCorrectLevel, getExpRangeForLevel } from '../../utils/exp'

import './PublicProfile.css'

export function PublicProfile() {
	const { username } = useParams()
	const { data: user, isLoading, isError } = useGetUserByUsernameQuery(username)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (isLoading) {
		return (
			<div className='public-profile-loader-container'>
				<div className='public-profile-loader'></div>
			</div>
		)
	}
	if (isError || !user) return <Navigate to='/not-found' replace />

	const exp =
		Number(user?.listeningExp) +
			Number(user?.readingExp) +
			Number(user?.writingExp) +
			Number(user?.speakingExp) || 0

	const level = getCorrectLevel(exp)
	const { minExp, maxExp } = getExpRangeForLevel(level)
	const expInLevel = exp - minExp
	const expRange = maxExp - minExp
	const progress = Math.min((expInLevel / expRange) * 100, 100)

	const userEXP = {
		listening: Number(user?.listeningExp) || 0,
		reading: Number(user?.readingExp) || 0,
		speaking: Number(user?.speakingExp) || 0,
		writing: Number(user?.writingExp) || 0,
		management: Number(user?.managementExp) || 0,
	}

	console.log('userEXP:', userEXP)

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

			<div
				className='public-profile-calendar-container'
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h3 style={{ textAlign: 'center', marginBottom: '16px' }}>
					📊 Overall Skill Radar
				</h3>
				<IELTSRadarChart userEXP={userEXP} />
			</div>
		</div>
	)
}

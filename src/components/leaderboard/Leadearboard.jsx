import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useTopUsers } from '../../hooks/useTopUsers'
import { useUserProfile } from '../../hooks/useUserProfile'
import './Leaderboard.css'

export function Leaderboard() {
	const { currentUser } = useAuth()
	const { teacher } = useUserProfile()
	const { users, hasMore, loadMore, loading } = useTopUsers(teacher)

	if (loading) return <div className='loader'></div>

	return (
		<section className='leaderboard-section'>
			<h2>🏆 Top Learners</h2>
			<div className='leaderboard-card'>
				{users.map((user, index) => {
					const isCurrentUser = currentUser?.uid === user.id

					return (
						<Link
							to={`/user/${user.username}`}
							key={user.id}
							className='leaderboard-user'
						>
							<div className='leaderboard-left'>
								<img
									src={user.profileImage || '/men-avatar.jpg'}
									className='leaderboard-avatar'
									alt={user.username}
								/>
								<div className='leaderboard-info-row'>
									<div className='leaderboard-name-container'>
										<span className='leaderboard-name'>{user.username}</span>
										{isCurrentUser && <span className='you-label'>(you)</span>}
									</div>
									<div
										className={`leaderboard-exp ${
											index === 0
												? 'gold'
												: index === 1
												? 'silver'
												: index === 2
												? 'bronze'
												: 'gray'
										}`}
									>
										{user.exp} EXP
									</div>
								</div>
							</div>
						</Link>
					)
				})}

				{hasMore && (
					<button className='see-more-btn' onClick={loadMore}>
						See Others
					</button>
				)}
			</div>
		</section>
	)
}

import { useAuth } from '../../context/authContext'
import { useTopUsers } from '../../hooks/useTopUsers'
import './Home.css'

export function Home() {
	const { currentUser } = useAuth()
	const { users, hasMore, fetchUsers } = useTopUsers()

	return (
		<div className='container home'>
			<section className='leaderboard-section'>
				<h2>🏆 Top Learners</h2>
				<div className='leaderboard-card'>
					{users.map((user, index) => {
						const isCurrentUser = currentUser?.uid === user.id

						return (
							<div key={user.id} className='leaderboard-user'>
								<div className='leaderboard-left'>
									<img
										src={user.profileImage || '/men-avatar.jpg'}
										alt={user.name}
										className='leaderboard-avatar'
									/>
									<div className='leaderboard-name-container'>
										<span className='leaderboard-name'>{user.name}</span>
										{isCurrentUser && <span className='you-label'>(you)</span>}
									</div>
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
									{user.exp || 0} EXP
								</div>
							</div>
						)
					})}

					{hasMore && (
						<button className='see-more-btn' onClick={() => fetchUsers(15)}>
							See Others
						</button>
					)}
				</div>
			</section>

			<section>
				<h2>🔍 What You’ll Find Here</h2>
				<ul>
					<li>🧠 Structured Reading Techniques</li>
					<li>🎧 Listening Mastery with a Fourfold Process</li>
					<li>✍️ Writing Task Guides and Model Answers</li>
					<li>🗣 Speaking Practice and Common Question Types</li>
				</ul>
			</section>
		</div>
	)
}

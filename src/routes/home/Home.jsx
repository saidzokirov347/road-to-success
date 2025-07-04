import AllUsersSidebar from '../../components/all-users-sidebar/AllUsersSidebar'
import { Leaderboard } from '../../components/leaderboard/Leadearboard'
import './Home.css'

export function Home() {
	return (
		<div className='home container'>
			<div className='home-content'>
				<section className='intro'>
					<h1>🎓 Welcome to Your IELTS Practice Hub</h1>
					<h2>What You’ll Find Here</h2>
					<ul>
						<li>🧠 Structured Reading Techniques</li>
						<li>🎧 Listening Mastery with a Fourfold Process</li>
						<li>✍️ Writing Task Guides and Model Answers</li>
						<li>🗣 Speaking Practice and Common Question Types</li>
					</ul>
				</section>
			</div>

			<div className='home-bottom'>
				<div className='home-leaderboard'>
					<Leaderboard />
				</div>
				<div className='home-sidebar'>
					<AllUsersSidebar />
				</div>
			</div>
		</div>
	)
}

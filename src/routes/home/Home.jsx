import { Link } from 'react-router-dom'
import { AllUsersSidebar, Leaderboard } from '../../components/index'
import './Home.css'

export function Home() {
	return (
		<div className='home container'>
			<div className='home-content'>
				<section className='intro'>
					<h1>🎓 Welcome to Your IELTS Practice Hub</h1>
					<h2>What You’ll Find Here</h2>
					<ul>
						<li>
							<Link to={'/reading'}>🧠 Structured Reading Techniques</Link>
						</li>
						<li>
							<Link to={'/listenig'}>
								🎧 Listening Mastery with a Fourfold Process
							</Link>
						</li>
						<li>
							<Link to={'/writing'}>
								✍️ Writing Task Guides and Model Answers
							</Link>
						</li>
						<li>
							<Link to={'/speaking'}>
								🗣 Speaking Practice and Common Question Types
							</Link>
						</li>
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

import './SkeletonQuizList.css'

export default function SkeletonQuizList() {
	return (
		<div className='quiz-page container'>
			<h2>📚 Available Quizzes</h2>
			<div className='quiz-grid'>
				{[1, 2, 3, 4].map(i => (
					<div key={i} className='quiz-card skeleton-card'>
						<div className='skeleton skeleton-title'></div>
						<div className='skeleton skeleton-desc'></div>
						<div className='skeleton skeleton-desc short'></div>
						<div className='skeleton skeleton-badges'></div>
						<div className='skeleton skeleton-meta'></div>
					</div>
				))}
			</div>
		</div>
	)
}

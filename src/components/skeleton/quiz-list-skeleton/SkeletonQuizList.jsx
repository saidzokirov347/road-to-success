import './SkeletonQuizList.css'

export default function SkeletonQuizList() {
	return (
		<div className='quiz-page container'>
			<h2 className='quiz-page-title'>📚 Available Quizzes</h2>
			<div className='quiz-grid'>
				{[...Array(3)].map((_, i) => (
					<div key={i} className='quiz-card skeleton-card'>
						<div className='quiz-header'>
							<div className='skeleton skeleton-title'></div>
							<div className='skeleton skeleton-badge'></div>
						</div>
						<div className='skeleton skeleton-desc'></div>
						<div className='skeleton skeleton-desc short'></div>
						<div className='skeleton skeleton-meta'></div>
					</div>
				))}
			</div>
		</div>
	)
}

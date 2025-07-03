import './SkeletonQuizPage.css'

export default function SkeletonQuizPage() {
	return (
		<div className='quiz-page'>
			<div className='quiz-header'>
				<div className='skeleton skeleton-back-btn'></div>
				<div className='quiz-title-wrapper'>
					<div className='skeleton skeleton-title'></div>
				</div>
			</div>

			<div className='progress-bar'>
				<div className='skeleton skeleton-bar'></div>
			</div>

			<div className='quiz-content'>
				<div className='skeleton skeleton-question-count'></div>
				<div className='skeleton skeleton-question'></div>
				<div className='quiz-options'>
					<div className='skeleton skeleton-option'></div>
					<div className='skeleton skeleton-option'></div>
					<div className='skeleton skeleton-option'></div>
					<div className='skeleton skeleton-option'></div>
				</div>
			</div>

			<div className='skeleton skeleton-button fixed-skeleton-btn'></div>
		</div>
	)
}

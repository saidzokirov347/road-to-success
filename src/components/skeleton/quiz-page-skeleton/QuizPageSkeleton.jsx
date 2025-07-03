import './SkeletonQuizPage.css'

export default function SkeletonQuizPage() {
	return (
		<div className='quiz-bg'>
			<div className='quiz-container'>
				<div className='skeleton skeleton-bar'></div>
				<div className='skeleton skeleton-title'></div>
				<div className='skeleton skeleton-text'></div>

				<div className='quiz-question'>
					<div className='skeleton skeleton-question'></div>
					<div className='quiz-options'>
						<div className='skeleton skeleton-option'></div>
						<div className='skeleton skeleton-option'></div>
						<div className='skeleton skeleton-option'></div>
						<div className='skeleton skeleton-option'></div>
					</div>
					<div className='skeleton skeleton-button'></div>
				</div>
			</div>
		</div>
	)
}

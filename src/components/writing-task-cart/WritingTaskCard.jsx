import './WritingTaskCard.css'

export function WritingTaskCard({ task }) {
	return (
		<div className='writing-task-card'>
			<div className='writing-task-card-img'>
				<img src={task.imageUrl} alt='Writing Task' />
			</div>
			<div className='card-content'>
				<span className='task-tag'>Task 1</span>
				<h2 className='task-question'>{task.question}</h2>
				<div className='task-meta'>
					<span>By Admin</span>
					<span>
						{new Date(task.createdAt?.seconds * 1000).toLocaleDateString()}
					</span>
				</div>
			</div>
		</div>
	)
}

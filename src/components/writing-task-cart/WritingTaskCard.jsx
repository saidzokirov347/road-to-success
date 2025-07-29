import './WritingTaskCard.css'

export function WritingTaskCard({ task }) {
	return (
		<div
			className={`writing-task-card ${
				task.type === 'task-2' && !task.imageUrl
					? 'writing-task-card-type-2'
					: ''
			}`}
		>
			{task.type === 'task-1' && task.imageUrl && (
				<div className='writing-task-card-img'>
					<img src={task.imageUrl} alt='Writing Task' />
				</div>
			)}
			<div className='card-content'>
				<span className='task-tag'>
					{task.type === 'task-1'
						? 'Type 1'
						: task.type === 'task-2'
						? 'Type 2'
						: 'Unknown'}
				</span>
				<h2 className='task-question'>{task.question}</h2>
				<a href={`/writing/${task.id}`} className='writing-task-link'>
					Practice
				</a>
			</div>
		</div>
	)
}

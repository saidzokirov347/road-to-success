import { WritingTaskCard } from '../../components'
import { useGetWritingTasksQuery } from '../../store/api/writing-api/writing.api'
import './WritingTasks.css'

export function WritingTasks() {
	const { data: tasks = [], isLoading } = useGetWritingTasksQuery()

	if (isLoading) return <p>Loading...</p>

	return (
		<div className='writing-tasks-grid container'>
			{tasks.map(task => (
				<WritingTaskCard key={task.id} task={task} />
			))}
		</div>
	)
}

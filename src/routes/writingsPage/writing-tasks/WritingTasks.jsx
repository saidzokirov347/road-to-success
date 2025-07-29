import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { WritingTaskCard } from '../../../components'
import { useGetWritingTasksQuery } from '../../../store/api/writing-api/writing.api'
import './WritingTasks.css'

export function WritingTasks() {
	const { data: tasks = [], isLoading } = useGetWritingTasksQuery()
	const [filter, setFilter] = useState('all')

	if (isLoading) return <p>Loading...</p>

	const filteredTasks =
		filter === 'all' ? tasks : tasks.filter(task => task.type === filter)

	return (
		<div className='writing-tasks-wrapper container'>
			<div className='writing-task-filter'>
				<div className='select-wrapper'>
					<select value={filter} onChange={e => setFilter(e.target.value)}>
						<option value='all'>All Types</option>
						<option value='task-1'>Type 1</option>
						<option value='task-2'>Type 2</option>
					</select>
					<ChevronDown className='select-icon' size={20} />
				</div>
			</div>
			<div className='writing-tasks-grid'>
				{filteredTasks.map(task => (
					<WritingTaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	)
}

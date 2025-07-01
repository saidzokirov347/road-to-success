import './CalendarSkeleton.css'

export default function CalendarSkeleton({ title = '📅 Calendar' }) {
	return (
		<div className='calendar-section skeleton'>
			<h3 className='calendar-title'>{title}</h3>
			<table className='calendar-table'>
				<thead>
					<tr>
						{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
							<th key={day}>{day}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 5 }).map((_, rowIndex) => (
						<tr key={rowIndex}>
							{Array.from({ length: 7 }).map((_, cellIndex) => (
								<td key={cellIndex} className='calendar-cell'>
									<div className='skeleton-box'>
										<div className='skeleton-date'></div>
										<div className='skeleton-mark'></div>
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

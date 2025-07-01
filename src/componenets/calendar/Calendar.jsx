import './Calendar.css'

export default function Calendar({
	marks = {},
	title = '📅 Calendar',
	onMark,
}) {
	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth()

	const getDaysInMonth = (year, month) => {
		const date = new Date(year, month, 1)
		const days = []
		while (date.getMonth() === month) {
			days.push(new Date(date))
			date.setDate(date.getDate() + 1)
		}
		return days
	}

	const days = getDaysInMonth(year, month)
	const firstDay = new Date(year, month, 1).getDay()
	const rows = []
	let row = []

	for (let i = 0; i < firstDay; i++) row.push(null)
	days.forEach(day => {
		row.push(day)
		if (row.length === 7) {
			rows.push(row)
			row = []
		}
	})
	if (row.length) {
		while (row.length < 7) row.push(null)
		rows.push(row)
	}

	const todayKey = today.toLocaleDateString('en-CA')

	return (
		<div className='calendar-section'>
			<h3>{title}</h3>
			<table className='calendar-table'>
				<thead>
					<tr>
						<th>Sun</th>
						<th>Mon</th>
						<th>Tue</th>
						<th>Wed</th>
						<th>Thu</th>
						<th>Fri</th>
						<th>Sat</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((week, i) => (
						<tr key={i}>
							{week.map((day, idx) => {
								if (!day) return <td key={idx} className='empty'></td>

								const dayKey = day.toLocaleDateString('en-CA')
								const mark = marks[dayKey]
								const isToday = dayKey === todayKey

								const handleClick = () => {
									if (isToday && !mark && onMark) {
										const confirm = window.confirm('✅ for Yes, ❌ for No?')
										onMark(confirm ? '✅' : '❌')
									}
								}

								return (
									<td
										key={idx}
										className={`day-cell ${isToday ? 'today' : ''} ${
											mark ? 'marked' : ''
										}`}
										onClick={handleClick}
									>
										<span className='date-num'>{day.getDate()}</span>
										{mark ? (
											<div className='mark'>{mark}</div>
										) : isToday && onMark ? (
											<div className='mark-buttons'>
												<button
													onClick={e => {
														e.stopPropagation()
														onMark('✅', dayKey)
													}}
													className='mark-btn success'
													disabled={!!marks[dayKey]}
												>
													✅
												</button>
												<button
													onClick={e => {
														e.stopPropagation()
														onMark('❌', dayKey)
													}}
													className='mark-btn fail'
													disabled={!!marks[dayKey]}
												>
													❌
												</button>
											</div>
										) : null}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

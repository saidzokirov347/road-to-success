import { getCalendarRows, getTodayKey } from '../../utils/date'
import './Calendar.css'

export default function Calendar({
	marks = {},
	title = '📅 Calendar',
	onMark,
}) {
	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth()

	const rows = getCalendarRows(year, month)
	const todayKey = getTodayKey()

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
										onMark(confirm ? '✅' : '❌', dayKey)
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

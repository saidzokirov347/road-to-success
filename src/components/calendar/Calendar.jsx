import { useState } from 'react'
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

	const [showIELTSSelect, setShowIELTSSelect] = useState(false)

	const handleEmojiClick = (emoji, dayKey) => {
		onMark({ emoji }, dayKey)
		if (emoji === '✅') setShowIELTSSelect(true)
	}

	const handleIELTSChange = (e, dayKey) => {
		onMark({ ielts: e.target.value }, dayKey)
		setShowIELTSSelect(false)
	}

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

								const handleCellClick = () => {
									if (isToday && !mark && onMark) {
										const confirm = window.confirm('✅ for Yes, ❌ for No?')
										onMark({ emoji: confirm ? '✅' : '❌' }, dayKey)
										if (confirm) setShowIELTSSelect(true)
									}
								}

								return (
									<td
										key={idx}
										className={`day-cell ${isToday ? 'today' : ''} ${
											mark ? 'marked' : ''
										}`}
										onClick={handleCellClick}
									>
										<span className='date-num'>{day.getDate()}</span>

										{/* Display mark */}
										{mark?.emoji && <div className='mark'>{mark.emoji}</div>}

										{/* Display IELTS score if available */}
										{mark?.ielts && (
											<div className='ielts-result'>🎯 {mark.ielts}</div>
										)}

										{/* Today's buttons if unmarked */}
										{isToday && !mark && onMark && (
											<div className='mark-buttons'>
												<button
													onClick={e => {
														e.stopPropagation()
														handleEmojiClick('✅', dayKey)
													}}
													className='mark-btn success'
												>
													✅
												</button>
												<button
													onClick={e => {
														e.stopPropagation()
														handleEmojiClick('❌', dayKey)
													}}
													className='mark-btn fail'
												>
													❌
												</button>
											</div>
										)}

										{/* IELTS dropdown if today, ✅ is marked, and no IELTS score yet */}
										{isToday &&
											mark?.emoji === '✅' &&
											!mark?.ielts &&
											showIELTSSelect && (
												<select
													className='ielts-select'
													onChange={e => handleIELTSChange(e, dayKey)}
													defaultValue=''
												>
													<option value='' disabled>
														Select IELTS result
													</option>
													{Array.from({ length: 11 }, (_, i) =>
														(4 + i * 0.5).toFixed(1)
													).map(score => (
														<option key={score} value={score}>
															{score}
														</option>
													))}
												</select>
											)}
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

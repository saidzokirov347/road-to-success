import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { removeExpFromUser } from '../../firebase/exp'
import { getCalendarRows, getTodayKey } from '../../utils/date'
import CalendarEditModal from '../calendar-edit-modal/CalendarEditModal'
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

	const { currentUser } = useAuth()
	const [modalData, setModalData] = useState(null)

	const [forceIELTSSelect, setForceIELTSSelect] = useState(false)
	useEffect(() => {
		if (!currentUser?.uid) return
		const todayMark = marks[todayKey]
		if (todayMark?.emoji && !todayMark?.ielts) {
			setForceIELTSSelect(true)
		} else {
			setForceIELTSSelect(false)
		}
	}, [marks, currentUser])

	const handleEmojiClick = (emoji, dayKey) => {
		onMark({ emoji }, dayKey)
	}

	const handleIELTSChange = async (e, dayKey) => {
		const score = parseFloat(e.target.value)
		const getExpFromIELTS = score => {
			if (score < 5.5) return 0
			if (score === 5.5) return 25
			if (score === 6.0) return 30
			if (score === 6.5) return 40
			if (score === 7.0) return 50
			if (score === 7.5) return 60
			if (score === 8.0) return 100
			if (score === 8.5) return 150
			if (score === 9.0) return 300
			return 0
		}

		onMark({ ielts: score }, dayKey)

		if (currentUser?.uid) {
			const exp = getExpFromIELTS(score)
			if (exp > 0) {
				// Optional: addExpToUser(currentUser.uid, exp)
			}
		}
	}

	useEffect(() => {
		if (!currentUser?.uid) return

		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		const yesterdayKey = yesterday.toLocaleDateString('en-CA')
		const mark = marks[yesterdayKey]

		const penaltyKey = `exp-penalty-${currentUser.uid}-${yesterdayKey}`
		const alreadyPenalized = localStorage.getItem(penaltyKey)

		if (!alreadyPenalized && (!mark || mark.emoji !== '✅')) {
			removeExpFromUser(currentUser.uid, 50)
			localStorage.setItem(penaltyKey, '1')
		}
	}, [marks, currentUser])

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
									if (mark) {
										setModalData({ dayKey, mark })
									} else if (isToday && onMark) {
										const confirm = window.confirm('✅ for Yes, ❌ for No?')
										onMark({ emoji: confirm ? '✅' : '❌' }, dayKey)
										setShowIELTSSelect(true)
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

										{mark?.emoji && <div className='mark'>{mark.emoji}</div>}
										{mark?.ielts && (
											<div className='ielts-result'>🎯 {mark.ielts}</div>
										)}

										{isToday && !mark && (
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
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>

			{modalData && (
				<CalendarEditModal
					dayKey={modalData.dayKey}
					mark={modalData.mark}
					onClose={() => setModalData(null)}
					onMark={onMark}
					handleIELTSChange={handleIELTSChange}
				/>
			)}
		</div>
	)
}

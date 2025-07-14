import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { addExpToUser } from '../../firebase/exp'
import { getCalendarRows, getTodayKey } from '../../utils/date'
import CalendarEditModal from '../calendar-edit-modal/CalendarEditModal'
import './Calendar.css'

export default function Calendar({
	marks = {},
	title = '📅 Calendar',
	onMark,
	isEditable = true,
}) {
	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth()
	const rows = getCalendarRows(year, month)
	const todayKey = getTodayKey()

	const { currentUser } = useAuth()
	const [modalData, setModalData] = useState(null)
	const [selectedEmoji, setSelectedEmoji] = useState('✅')
	const marksSnapshotRef = useRef(null)

	useEffect(() => {
		if (!currentUser?.uid || !isEditable) return

		if (!marksSnapshotRef.current) {
			marksSnapshotRef.current = marks
		}
	}, [currentUser, isEditable, marks])

	useEffect(() => {
		if (!isEditable || Notification.permission !== 'granted') return

		const alreadyMarked = marks && marks[todayKey]
		const alreadyNotified =
			localStorage.getItem('calendarNotifiedDate') === todayKey

		if (!alreadyMarked && !alreadyNotified) {
			new Notification('📅 Reminder', {
				body: 'Don’t forget to tick your calendar today!',
				icon: '/logo192.png',
			})
			localStorage.setItem('calendarNotifiedDate', todayKey)
		}
	}, [marks, todayKey, isEditable])

	const handleEmojiClick = (emoji, dayKey) => {
		if (!isEditable) return
		setSelectedEmoji(emoji)
		onMark({ emoji }, dayKey)
		setModalData({ dayKey, mark: { emoji } })
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

		onMark({ emoji: selectedEmoji, ielts: score }, dayKey)

		if (currentUser?.uid && isEditable) {
			const exp = getExpFromIELTS(score)
			if (exp > 0) {
				await addExpToUser(currentUser.uid, exp)
			}
		}
	}

	return (
		<div className='calendar-section'>
			<h3>{title}</h3>
			<table className='calendar-table'>
				<thead>
					<tr>
						<th>Mon</th>
						<th>Tue</th>
						<th>Wed</th>
						<th>Thu</th>
						<th>Fri</th>
						<th>Sat</th>
						<th>Sun</th>
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
									if (!isEditable) return
									if (mark) {
										setModalData({ dayKey, mark })
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

										{isToday && !mark && isEditable && (
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

			{isEditable && modalData && (
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

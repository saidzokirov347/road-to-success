import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { addExpToUser } from '../../firebase/exp'
import { db } from '../../firebase/firebase'
import './Listening.css'

export function Listening() {
	const { currentUser } = useAuth()
	const [marks, setMarks] = useState({})
	const [today, setToday] = useState(new Date())
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (!currentUser) return

			const userRef = doc(db, 'users', currentUser.uid)
			const snap = await getDoc(userRef)

			if (snap.exists()) {
				const data = snap.data()
				setMarks(data.listeningMarks || {})
			}

			setLoading(false)
		}

		fetchData()
	}, [currentUser])

	const handleMark = async mark => {
		if (!currentUser) return

		const dateKey = today.toLocaleDateString('en-CA')
		if (marks[dateKey]) return // Already marked, prevent duplicate marking

		const updatedMarks = { ...marks, [dateKey]: mark }
		setMarks(updatedMarks) // update UI immediately

		await updateDoc(doc(db, 'users', currentUser.uid), {
			listeningMarks: updatedMarks,
		})

		if (mark === '✅') {
			await addExpToUser(currentUser.uid, 25)
		}
	}

	const getDaysInMonth = (year, month) => {
		const date = new Date(year, month, 1)
		const days = []
		while (date.getMonth() === month) {
			days.push(new Date(date))
			date.setDate(date.getDate() + 1)
		}
		return days
	}

	const renderCalendar = () => {
		const year = today.getFullYear()
		const month = today.getMonth()
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

		const todayKey = new Date().toLocaleDateString('en-CA')

		return (
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
									if (isToday && !mark) {
										const confirm = window.confirm('✅ for Yes, ❌ for No?')
										handleMark(confirm ? '✅' : '❌')
									}
								}

								return (
									<td
										key={idx}
										className={`day-cell ${isToday ? 'today' : ''} ${
											mark ? 'marked' : ''
										}`}
									>
										<span className='date-num'>{day.getDate()}</span>

										{mark ? (
											<div className='mark'>{mark}</div>
										) : isToday ? (
											<div className='mark-buttons'>
												<button
													onClick={() => handleMark('✅')}
													className='mark-btn success'
													disabled={!!marks[dayKey]}
												>
													✅
												</button>
												<button
													onClick={() => handleMark('❌')}
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
		)
	}

	return (
		<div className='container'>
			<section id='listening'>
				<h2>🎧 The Fourfold Path to Mastering IELTS Listening</h2>
				<p>
					<em>A journey from chaos to clarity — one playback at a time.</em>
				</p>

				<div className='calendar-section'>
					<h3>📅 Practice Calendar</h3>

					{loading ? <div className='loader'></div> : renderCalendar()}
				</div>
			</section>
		</div>
	)
}

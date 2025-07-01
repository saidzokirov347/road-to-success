import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Calendar from '../../componenets/calendar/Calendar'
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
		if (marks[dateKey]) return

		const updatedMarks = { ...marks, [dateKey]: mark }
		setMarks(updatedMarks)

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

				{/* Strategy blocks */}
				<div className='stage-block'>
					<h3>
						➊ Stage One – <em>Straight Solve</em>
					</h3>
					<p>
						<strong>What:</strong> Listen and answer all questions in order,
						skipping only ones that are unclear.
						<br />
						<strong>Why:</strong> Builds flow and prevents freezing on difficult
						parts.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➋ Stage Two – <em>Spot Patterns</em>
					</h3>
					<p>
						<strong>What:</strong> Identify the type of each question and match
						it with its usual trick (e.g., paraphrase, distractor, etc.).
						<br />
						<strong>Why:</strong> Trains your instincts to recognize traps.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➌ Stage Three – <em>Transcript Replay</em>
					</h3>
					<p>
						<strong>What:</strong> Re-listen with transcript to spot what you
						missed and how.
						<br />
						<strong>Why:</strong> Turns every mistake into a permanent gain.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➍ Stage Four – <em>Targeted Practice</em>
					</h3>
					<p>
						<strong>What:</strong> Focus only on your weak question types (e.g.,
						maps or summary).
						<br />
						<strong>Why:</strong> 80/20 practice: most gain from least effort.
					</p>
				</div>

				{loading ? (
					<div className='loader'></div>
				) : (
					<Calendar
						marks={marks}
						onMark={handleMark}
						title='📅 Practice Calendar'
					/>
				)}
			</section>
		</div>
	)
}

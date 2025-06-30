import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { addExpToUser } from '../../firebase/exp'
import { db } from '../../firebase/firebase'
import './Reading.css'

export function Reading() {
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
				setMarks(data.readingMarks || {})
			}

			setLoading(false)
		}

		fetchData()
	}, [currentUser])

	const handleMark = async mark => {
		if (!currentUser) return

		const dateKey = today.toISOString().split('T')[0]
		if (marks[dateKey]) return

		const updatedMarks = { ...marks, [dateKey]: mark }
		setMarks(updatedMarks)

		await updateDoc(doc(db, 'users', currentUser.uid), {
			readingMarks: updatedMarks,
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
			<section id='reading'>
				<h2>📘 The Four-Stage Path to IELTS Reading Mastery</h2>
				<p>
					<em>Each stage precise—first the work, then the insight.</em>
				</p>

				<div className='stage-block'>
					<h3>
						➊ Stage One – <em>Straight Solve</em>
					</h3>
					<p>
						<strong>What:</strong> Under strict timing, students answer every
						question in order, skipping only those they cannot immediately
						resolve.
						<br />
						<strong>Why:</strong> Secures quick points and maps out difficult
						items for later review, ensuring forward momentum from the very
						first minute.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➋ Stage Two – <em>Reference & Cohesion Check</em>
					</h3>
					<p>
						<strong>What:</strong> Students underline every pronoun or reference
						word (“it,” “they,” “this,” etc.) and trace it back to its noun or
						idea. They also note linking words (“however,” “therefore,”
						“meanwhile”) as in a writing draft.
						<br />
						<strong>Why:</strong> Clarifies ambiguous language and solidifies
						understanding of each paragraph’s flow—just as a writer confirms
						coherence before polishing a text.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➌ Stage Three – <em>Double-Check & Flip Logic</em>
					</h3>
					<p>
						<strong>What:</strong> Returning to flagged or True/False/Not-Given
						items, students re-read relevant lines, rephrase each statement as a
						question or its opposite, and judge whether the passage truly
						supports, contradicts, or omits the claim.
						<br />
						<strong>Why:</strong> This “flipping” sharpens sensitivity to subtle
						meaning shifts and prevents keyword traps—transforming uncertainty
						into clear, text-based decisions.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➍ Stage Four – <em>Summarize & Match Headings</em>
					</h3>
					<p>
						<strong>What:</strong> For each paragraph, students paraphrase the
						proposed headings, scan for key synonyms, and select the title that
						best captures the author’s main purpose rather than a single detail.
						<br />
						<strong>Why:</strong> By treating headings as paragraph “titles,”
						they distill the core idea—ensuring that every match rests on
						genuine comprehension, not a lucky guess.
					</p>
				</div>

				<p className='conclusion-text'>
					<em>
						This four-stage sequence—Solve, Reference, Flip, Match—wraps your
						proven techniques into a seamless flow. Students engage fully at
						each step, applying writing-style logic to guarantee accuracy and
						confidence under exam pressure.
					</em>
				</p>

				<div className='calendar-section'>
					<h3>📅 Practice Calendar</h3>
					{loading ? <div className='loader'></div> : renderCalendar()}
				</div>

				<a
					href='https://mini-ielts.com/reading'
					className='button reading-link'
					target='_blank'
				>
					📘 Practice Reading on Mini IELTS
				</a>
			</section>
		</div>
	)
}

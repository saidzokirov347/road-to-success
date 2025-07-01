import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Calendar from '../../componenets/calendar/Calendar'
import { useAuth } from '../../context/authContext'
import { addExpToUser } from '../../firebase/exp'
import { db } from '../../firebase/firebase'
import { stages } from '../../static/readingStages'
import './Reading.css'

export function Reading() {
	const { currentUser } = useAuth()
	const [marks, setMarks] = useState({})
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

	const handleMark = async (mark, dayKey) => {
		if (!currentUser) return
		if (marks[dayKey]) return

		const updatedMarks = { ...marks, [dayKey]: mark }
		setMarks(updatedMarks)

		await updateDoc(doc(db, 'users', currentUser.uid), {
			readingMarks: updatedMarks,
		})

		if (mark === '✅') {
			await addExpToUser(currentUser.uid, 25)
		}
	}

	return (
		<div className='container'>
			<section id='reading'>
				<h2>📘 The Fourfold Path to IELTS Reading Mastery</h2>
				<p>
					<em>Solve it. Diagnose it. Prove it. Rebuild it.</em>
				</p>

				{stages.map((stage, index) => (
					<div className='stage-block' key={index}>
						<h3>{stage.title}</h3>
						<h4>What to do:</h4>
						<ul>
							{stage.what.map((step, i) => (
								<li key={i}>{step}</li>
							))}
						</ul>
						<h4>Why:</h4>
						<p>{stage.why}</p>
					</div>
				))}

				<div className='calendar-section'>
					{loading ? (
						<div className='loader'></div>
					) : (
						<Calendar marks={marks} onMark={handleMark} />
					)}
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

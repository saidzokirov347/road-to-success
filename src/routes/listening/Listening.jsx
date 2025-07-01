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

	const handleMark = async (mark, dayKey) => {
		if (!currentUser || marks[dayKey]) return

		const updatedMarks = { ...marks, [dayKey]: mark }
		setMarks(updatedMarks)

		await updateDoc(doc(db, 'users', currentUser.uid), {
			listeningMarks: updatedMarks,
		})

		if (mark === '✅') {
			await addExpToUser(currentUser.uid, 25)
		}
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

				{/* Calendar block */}
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

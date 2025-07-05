import Calendar from '../../components/calendar/Calendar'
import { stages } from '../../constants/reading-stages.constants'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Reading.css'

export function Reading() {
	const { marks, loading, handleMark } = usePracticeMarks('reading')

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='reading-drill container'>
			<h1>📘 The Fourfold Path to IELTS Reading Mastery</h1>
			<h2>
				Your daily system to decode, reflect, and dominate the Reading section.
			</h2>

			<p className='drill-note'>
				⏱ <strong>Total Time:</strong> 30–45 minutes
				<br />
				Split it across your day or do it in one go—consistency is the key.
			</p>

			{stages.map((stage, index) => (
				<div className='pillar' key={index}>
					<h3>{stage.title}</h3>
					<h4>What to do:</h4>
					<ul>
						{stage.what.map((step, i) => (
							<li key={i}>{step}</li>
						))}
					</ul>
					<h4>Why:</h4>
					<blockquote>{stage.why}</blockquote>
				</div>
			))}

			<div className='checklist'>
				<h4>✔️ Daily Quick-Check</h4>
				<ul>
					<li>[ ] Did I identify why I got each answer wrong?</li>
					<li>[ ] Did I try the question again from scratch?</li>
					<li>[ ] Did I explain my logic aloud or on paper?</li>
					<li>[ ] Did I focus on *skill* not *score*?</li>
				</ul>
			</div>

			<p className='final-note'>
				🔄 Follow this ritual daily, and you’ll stop fearing headings, matching,
				and true/false questions—because you'll know their patterns by heart.
			</p>

			<div className='calendar-section'>
				{loading ? (
					<div className='loader'></div>
				) : (
					<Calendar
						marks={marks}
						onMark={handleMark}
						title='📅 Reading Practice History'
					/>
				)}
			</div>

			<a
				href='https://mini-ielts.com/reading'
				className='button reading-link'
				target='_blank'
				rel='noopener noreferrer'
			>
				🌐 Practice on Mini IELTS
			</a>
		</div>
	)
}

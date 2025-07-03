import Calendar from '../../components/calendar/Calendar'
import { stages } from '../../constants/reading-stages.constants'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Reading.css'

export function Reading() {
	const { marks, loading, handleMark } = usePracticeMarks('reading')

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
						<Calendar
							marks={marks}
							onMark={handleMark}
							title='📅 Listening Practice History'
						/>
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

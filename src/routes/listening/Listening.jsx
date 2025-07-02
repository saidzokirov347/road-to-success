import Calendar from '../../components/calendar/Calendar'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Listening.css'

export function Listening() {
	const { marks, loading, handleMark } = usePracticeMarks('listening')

	return (
		<div className='container'>
			<section id='listening'>
				<h2>🎧 The Fourfold Path to Mastering IELTS Listening</h2>
				<p>
					<em>A journey from chaos to clarity — one playback at a time.</em>
				</p>

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

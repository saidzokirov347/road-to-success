import { useEffect } from 'react'
import Calendar from '../../components/calendar/Calendar'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Listening.css'

export function Listening() {
	const { marks, loading, handleMark } = usePracticeMarks('listening')

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='listening-drill container'>
			<h1>🎧 The Fourfold Path to Mastering IELTS Listening</h1>

			<p className='listening-message'>
				🎧 Listen to understand — not just to respond. Don’t rush to catch the
				answer; absorb the context, tone, and logic of the speakers. The answers
				will reveal themselves when your mind is focused on meaning, not just
				words.
			</p>

			<div className='pillar'>
				<h3>
					➊ Stage One – <em>Straight Solve</em>
				</h3>
				<ul>
					<li>Listen and answer all questions in order.</li>
					<li>Skip only what’s absolutely unclear—keep moving.</li>
				</ul>
				<blockquote>
					Why: Builds flow and prevents freezing on tricky sections.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➋ Stage Two – <em>Spot Patterns</em>
				</h3>
				<ul>
					<li>Label each question: gap fill, multiple choice, map, etc.</li>
					<li>Note the trap type: paraphrase, distractor, sequence swap...</li>
				</ul>
				<blockquote>
					Why: You train your brain to *predict* IELTS tricks before they
					strike.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➌ Stage Three – <em>Transcript Replay</em>
				</h3>
				<ul>
					<li>Play the recording again with transcript.</li>
					<li>Underline exact words you missed.</li>
				</ul>
				<blockquote>
					Why: Every mistake becomes a teacher when analyzed properly.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➍ Stage Four – <em>Targeted Practice</em>
				</h3>
				<ul>
					<li>Identify weak question types (e.g., maps, table completion).</li>
					<li>Do 3–5 extra mini-tasks of that type only.</li>
				</ul>
				<blockquote>
					Why: 80/20 strategy—fix the few that hurt the most.
				</blockquote>
			</div>

			<div className='checklist'>
				<h4>✔️ Daily Quick-Check</h4>
				<ul>
					<li>[ ] Did I stay calm and finish the full test?</li>
					<li>[ ] Did I analyze 3+ traps that tricked me?</li>
					<li>[ ] Did I read transcripts and highlight misses?</li>
					<li>[ ] Did I do targeted drills on weak spots?</li>
				</ul>
			</div>

			<p className='final-note'>
				🔁 Repeat these four stages daily. In 30 sessions, your listening brain
				will be rewired for precision and performance.
			</p>

			{loading ? (
				<div className='loader'></div>
			) : (
				<Calendar
					marks={marks}
					onMark={handleMark}
					title='📅 Listening Practice History'
				/>
			)}

			<a
				href='https://mini-ielts.com/listening'
				className='button listening-link'
				target='_blank'
				rel='noopener noreferrer'
			>
				🌐 Practice on Mini IELTS
			</a>
		</div>
	)
}

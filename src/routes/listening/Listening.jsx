import { useEffect } from 'react'
import { Calendar } from '../../components/index'
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

			<a
				href='https://vocalremover.org/pitch'
				target='_blank'
				rel='noopener noreferrer'
				className='button listening-link'
			>
				🧭 Open Speed Changer Tool
			</a>
			<br />
			<br />

			<div className='pillar'>
				<h3>
					➊ Stage One – <em>Solving (1.0× Speed)</em>
				</h3>
				<ul>
					<li>Play the recording at normal speed, once.</li>
					<li>Attempt all questions in order, without pausing or rewinding.</li>
					<li>Focus on maintaining pace — don’t get stuck on a single item.</li>
				</ul>
				<blockquote>
					Why: You simulate the real exam and test your natural comprehension
					under pressure. It sets your baseline.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➋ Stage Two – <em>Resolving (1.2× Speed)</em>
				</h3>
				<ul>
					<li>Replay the same audio slightly faster.</li>
					<li>Focus only on missed or doubtful questions.</li>
					<li>
						Ask: “What tricked me?” — Was it a paraphrase? A pause? A sequence?
					</li>
				</ul>
				<blockquote>
					Why: Speed exposes gaps. This phase sharpens your reaction to IELTS
					traps and improves time awareness.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➌ Stage Three – <em>Proving (1.2×–1.5× Speed)</em>
				</h3>
				<ul>
					<li>Replay again, this time with the transcript open.</li>
					<li>Transcribe missed parts exactly — no rewording.</li>
					<li>Underline key transitions, phrases, and reference words.</li>
				</ul>
				<blockquote>
					Why: You’re training your ear to catch the structure and wording of
					real IELTS passages with precision.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➍ Stage Four – <em>Listening Without Booklet (1.5× Speed)</em>
				</h3>
				<ul>
					<li>Put away all questions and materials.</li>
					<li>Listen purely for understanding — no pressure to answer.</li>
					<li>Try to follow 100% of what’s said, even at a fast pace.</li>
				</ul>
				<blockquote>
					Why: This builds real-world listening fluency. No pauses, no guesses —
					just pure comprehension.
				</blockquote>
			</div>

			<div className='checklist'>
				<h4>✔️ Daily Quick-Check</h4>
				<ul>
					<li>[ ] Did I complete one full test at regular speed?</li>
					<li>[ ] Did I revisit and understand at least 3 unclear parts?</li>
					<li>[ ] Did I write out missed lines exactly from the audio?</li>
					<li>[ ] Did I end with a full-speed listen-through, no booklet?</li>
				</ul>
			</div>

			<p className='final-note'>
				🔁 Repeat this routine consistently. In 30 days, you’ll find your
				listening sharper, faster, and more automatic.
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

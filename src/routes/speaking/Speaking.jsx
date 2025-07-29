import { useEffect } from 'react'
import { Calendar } from '../../components/index'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Speaking.css'

export function Speaking() {
	const { marks, loading, handleMark } = usePracticeMarks('speaking')

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='speaking-drill container'>
			<h1>🗣️ IELTS Speaking – The Dual-Voice Approach</h1>

			<p className='speaking-message'>
				🗣️ Speak with confidence at your natural level. Fluency shines when
				you’re relaxed and expressive — not when you chase fancy phrases. Let
				your tone be natural and your words be real.
			</p>

			<div className='pillar'>
				<h3>
					➊ Solo Flow – <em>Speak to Yourself, Not in Your Head</em>
				</h3>
				<ul>
					<li>Speak out loud regularly—don’t stay silent in thought.</li>
					<li>
						Choose a topic. Speak 2–3 minutes nonstop with natural transitions.
					</li>
					<li>Focus on stretching grammar and vocabulary freely.</li>
				</ul>
				<blockquote>
					Why: Fluency starts with movement, not perfection. You’re building
					muscle memory.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>
					➋ Dialogues in Motion – <em>Peer or AI Conversations</em>
				</h3>
				<ul>
					<li>Use ChatGPT or a peer to simulate Parts 1, 2, and 3.</li>
					<li>Time each turn and avoid long pauses.</li>
					<li>After 5–6 minutes, reflect and revise.</li>
				</ul>
				<blockquote>
					Why: Real-time dialogue pushes pacing, pronunciation, and recovery
					speed.
				</blockquote>
			</div>

			<div className='checklist'>
				<h4>✔️ Daily Quick-Check</h4>
				<ul>
					<li>[ ] Did I speak out loud for at least 5 minutes solo?</li>
					<li>[ ] Did I try 1 dialogue or role-play with a peer or bot?</li>
					<li>
						[ ] Did I use at least 3 idiomatic or topic-specific expressions?
					</li>
					<li>[ ] Did I self-correct or reflect at the end?</li>
				</ul>
			</div>

			<p className='final-note'>
				🎤 This two-voice method dissolves hesitation, trains spontaneity, and
				transforms practice into performance.
			</p>

			<div className='recommended-channels'>
				<h4>📺 Fluency Boost – Recommended Listening</h4>
				<p>
					These channels are carefully selected to help you improve fluency,
					pronunciation, and confidence. Don’t just watch—
					<strong>pause, repeat, and practice aloud</strong>. Your voice is your
					strongest skill in IELTS. Train it daily.
				</p>
				<ul>
					<li>
						<a
							href='https://youtube.com/@thediaryofaceo?si=52SjG8p2i6Cgixih'
							target='_blank'
							rel='noopener noreferrer'
						>
							📌 The Diary of a CEO – Authentic, emotional English
						</a>
					</li>
					<li>
						<a
							href='https://youtube.com/@chriswillx?si=hQk3aRKP_Su__HEh'
							target='_blank'
							rel='noopener noreferrer'
						>
							📌 Chris Williamson – Thought-provoking, fluent discussion
						</a>
					</li>
					<li>
						<a
							href='https://youtube.com/@jayshettypodcast.?si=fX_8KP1P81Y23GaT'
							target='_blank'
							rel='noopener noreferrer'
						>
							📌 Jay Shetty Podcast – Calm, clear, connected speech
						</a>
					</li>
				</ul>
			</div>

			{loading ? (
				<div className='loader'></div>
			) : (
				<Calendar
					marks={marks}
					onMark={handleMark}
					title='📅 Speaking Practice History'
					category='speaking'
					isEditable={true}
				/>
			)}
		</div>
	)
}

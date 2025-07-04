import Calendar from '../../components/calendar/Calendar'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Speaking.css'

export function Speaking() {
	const { marks, loading, handleMark } = usePracticeMarks('speaking')
	return (
		<div className='speaking-drill container'>
			<h1>🗣️ IELTS Speaking – The Dual-Voice Approach</h1>
			<h2>One voice builds the structure. The other brings it alive.</h2>

			<p className='drill-note'>
				⏱ <strong>Daily Time:</strong> 30–40 minutes
				<br />
				Balance solo fluency and partner pressure.
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

			{loading ? (
				<div className='loader'></div>
			) : (
				<Calendar
					marks={marks}
					onMark={handleMark}
					title='📅 Speaking Practice History'
				/>
			)}
		</div>
	)
}

import Calendar from '../../components/calendar/Calendar'
import { usePracticeMarks } from '../../hooks/usePracticeMarks'
import './Speaking.css'

export function Speaking() {
	const { marks, loading, handleMark } = usePracticeMarks('speaking')
	return (
		<div className='container'>
			<section id='speaking'>
				<h2>🗣️ IELTS Speaking – The Dual-Voice Approach</h2>
				<p>
					<em>One voice builds the structure. The other brings it alive.</em>
				</p>

				<div className='stage-block'>
					<h3>
						➊ Solo Flow – <em>Speak to Yourself, Not in Your Head</em>
					</h3>
					<p>
						<strong>What to do:</strong> Speak out loud to yourself
						regularly—not silently in thought, but with full articulation.
						Choose everyday topics and try to express them using accurate
						vocabulary and varied grammar, flowing from sentence to sentence
						without self-interruption.
					</p>
					<p>
						<strong>Why it works:</strong> Speaking to yourself is where fluency
						begins. It’s rehearsal without the spotlight—where you stretch
						grammar structures and vocabulary choices until they feel native.
						This trains both <strong>Lexical Resource</strong> and{' '}
						<strong>Grammatical Range & Accuracy</strong>, not just in
						correctness, but in real-time flexibility.
					</p>
					<p>
						<strong>Tip:</strong> Don’t aim for perfection. Aim for movement.
						Fixing comes later.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➋ Dialogues in Motion – <em>Pair Speaking & Digital Partnering</em>
					</h3>
					<p>
						<strong>What to do:</strong> Regularly practice with a peer or with
						ChatGPT. Choose spontaneous topics, Part 2 prompts, or debate-style
						discussions. Time yourselves. Keep the conversation alive. Then
						reflect.
					</p>
					<p>
						<strong>Why it works:</strong> True fluency grows not in solitude
						but in responsive pressure—when someone else is watching, waiting,
						listening. This stage sharpens your{' '}
						<strong>Fluency & Coherence</strong> and{' '}
						<strong>Pronunciation</strong>, pushing your pace, rhythm, and
						recovery speed. The mind no longer “finds” words—it summons them.
					</p>
					<p>
						<strong>Tip:</strong> Speak first, correct after. Speed first,
						precision follows.
					</p>
				</div>

				<p className='conclusion-text'>
					<em>
						This dual-voice method—private rehearsal and public rhythm—doesn’t
						just teach speaking. It dissolves the fear of speaking. One voice
						builds the system. The other sets it on fire.
					</em>
				</p>
			</section>

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

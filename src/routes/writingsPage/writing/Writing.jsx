import { useEffect } from 'react'
import { Calendar } from '../../../components/index'
import { usePracticeMarks } from '../../../hooks/usePracticeMarks'
import './Writing.css'

export function Writing() {
	const { marks, loading, handleMark } = usePracticeMarks('writing')

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='writing-drill container'>
			<h1>🧱 The 4-Pillar Daily Drill</h1>

			<p className='writing-message'>
				✍️ Write at the level you truly master. IELTS rewards clarity, not
				complexity. Use grammar and vocabulary you control — not what you hope
				might impress.
			</p>

			<div className='pillar'>
				<h3>📝 Pillar 1: Plan with Precision (10 min)</h3>
				<ul>
					<li>Choose your prompt (Task 1 or Task 2).</li>
					<li>
						Underline every part of the question: what exactly are you asked to
						do?
					</li>
					<li>
						Write a mini-plan:
						<ul>
							<li>
								<strong>Task 1:</strong> Paraphrase the prompt + list two main
								features to compare.
							</li>
							<li>
								<strong>Task 2:</strong> Paraphrase the prompt + state your
								opinion + jot down two topic sentences.
							</li>
						</ul>
					</li>
				</ul>
				<blockquote>
					Goal: Know exactly what to write—no surprises, no missing parts.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>✂️ Pillar 2: Build One Perfect Paragraph (10 min)</h3>
				<ul>
					<li>From your plan, write one body paragraph only.</li>
					<li>
						Structure it clearly:
						<ul>
							<li>Topic sentence (your main idea).</li>
							<li>Explanation/example (proof).</li>
							<li>Mini-conclusion (tie it back).</li>
						</ul>
					</li>
					<li>
						Use 3 linking words naturally (e.g., however, moreover, for
						example).
					</li>
				</ul>
				<blockquote>
					Goal: Nail paragraph unity and flow—this is your building block.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>🚀 Pillar 3: Level-Up Your Vocabulary (10 min)</h3>
				<ul>
					<li>Pick 5 strong words/phrases from a Band 9 model.</li>
					<li>Re-write your paragraph using these new words naturally.</li>
				</ul>
				<blockquote>
					Goal: Move beyond “big,” “good,” and “important” to precise, academic
					language.
				</blockquote>
			</div>

			<div className='pillar'>
				<h3>🔧 Pillar 4: Master Your Grammar (15 min)</h3>
				<ul>
					<li>Rewrite the paragraph to make it your “perfect” version.</li>
					<li>
						Include:
						<ul>
							<li>1 passive construction (e.g., “...is shown...”)</li>
							<li>1 complex sentence (with relative clause or conditional)</li>
						</ul>
					</li>
					<li>Proofread for every article, verb tense, and punctuation.</li>
				</ul>
				<blockquote>
					Goal: Seamlessly mix simple and complex structures without a single
					mistake.
				</blockquote>
			</div>

			<div className='checklist'>
				<h4>✔️ Daily Quick-Check</h4>
				<ul>
					<li>[ ] Did I cover all parts of the task?</li>
					<li>[ ] Is my paragraph focused and well-linked?</li>
					<li>[ ] Have I used 5 new words correctly?</li>
					<li>[ ] Did I add passive voice and a complex sentence?</li>
					<li>[ ] Is my final paragraph error-free?</li>
				</ul>
			</div>

			<p className='final-note'>
				🔄 Repeat this drill every day for 60 days and you’ll train your brain
				to think, plan, and write like a Band 9 candidate—one perfect paragraph
				at a time.
			</p>

			<a href='/profile/write-essay' className='button-link reading-link'>
				Practice Writing 🖋️
			</a>

			{loading ? (
				<div className='loader'></div>
			) : (
				<Calendar
					marks={marks}
					onMark={handleMark}
					title='📅 Writing Practice History'
					category='writing'
					isEditable={true}
				/>
			)}

			<div className='writing-links'>
				<a
					href='/writing-books/task-1.pdf'
					download
					className='button reading-link'
				>
					💾 Download Writing Task 1 Book
				</a>
				<a
					href='/writing-books/task-2.pdf'
					download
					className='button reading-link'
				>
					💾 Download Writing Task 2 Book
				</a>
			</div>
		</div>
	)
}

import './Writing.css'

export function Writing() {
	return (
		<div className='container'>
			<section id='writing'>
				<h2>✍️ Writing</h2>
				<p>
					<strong>Goal:</strong> Improve structure, clarity, and task
					fulfillment.
				</p>

				<ul>
					<li>
						Use the structure:
						<strong> Intro → Overview → Body 1 → Body 2</strong>
					</li>
					<li>
						Task 1: Summarize trends, not every number. Use formal vocabulary
					</li>
					<li>
						Task 2: Express clear opinions with
						<strong> logical paragraphing</strong>
					</li>
					<li>Use Pauline Cullen books to target band 7+ criteria</li>
					<li>Review model answers, especially for grammar and cohesion</li>
					<li>
						<em>Strategy tip:</em> Track your page in the PDF & your own notes
						below
					</li>
				</ul>

				<ul>
					<li>
						<a
							href='pauline_cullen_the_key_to_ielts_academic_writing_task_1_book.pdf'
							download
						>
							📄 Download Task 1 PDF
						</a>
					</li>
					<li>
						<a
							href='pauline_cullen_the_key_to_ielts_writing_task_2.pdf'
							download
						>
							📄 Download Task 2 PDF
						</a>
					</li>
				</ul>

				<div className='progress-box'>
					<label htmlFor='writingProgress'>Track your progress:</label>
					<textarea
						id='writingProgress'
						placeholder='e.g., Page 20: Bar Chart done...'
					></textarea>
					<button onClick={() => saveProgress()}>💾 Save</button>
					<p id='savedMsg' className='saved-message'></p>
				</div>
			</section>
		</div>
	)
}

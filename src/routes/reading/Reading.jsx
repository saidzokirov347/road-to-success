import './Reading.css'

export function Reading() {
	return (
		<div className='container'>
			<section id='reading'>
				<h2>📘 The Four-Stage Path to IELTS Reading Mastery</h2>
				<p>
					<em>Each stage precise—first the work, then the insight.</em>
				</p>

				<div className='stage-block'>
					<h3>
						➊ Stage One – <em>Straight Solve</em>
					</h3>
					<p>
						<strong>What:</strong> Under strict timing, students answer every
						question in order, skipping only those they cannot immediately
						resolve.
						<br />
						<strong>Why:</strong> Secures quick points and maps out difficult
						items for later review, ensuring forward momentum from the very
						first minute.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➋ Stage Two – <em>Reference & Cohesion Check</em>
					</h3>
					<p>
						<strong>What:</strong> Students underline every pronoun or reference
						word (“it,” “they,” “this,” etc.) and trace it back to its noun or
						idea. They also note linking words (“however,” “therefore,”
						“meanwhile”) as in a writing draft.
						<br />
						<strong>Why:</strong> Clarifies ambiguous language and solidifies
						understanding of each paragraph’s flow—just as a writer confirms
						coherence before polishing a text.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➌ Stage Three – <em>Double-Check & Flip Logic</em>
					</h3>
					<p>
						<strong>What:</strong> Returning to flagged or True/False/Not-Given
						items, students re-read relevant lines, rephrase each statement as a
						question or its opposite, and judge whether the passage truly
						supports, contradicts, or omits the claim.
						<br />
						<strong>Why:</strong> This “flipping” sharpens sensitivity to subtle
						meaning shifts and prevents keyword traps—transforming uncertainty
						into clear, text-based decisions.
					</p>
				</div>

				<div className='stage-block'>
					<h3>
						➍ Stage Four – <em>Summarize & Match Headings</em>
					</h3>
					<p>
						<strong>What:</strong> For each paragraph, students paraphrase the
						proposed headings, scan for key synonyms, and select the title that
						best captures the author’s main purpose rather than a single detail.
						<br />
						<strong>Why:</strong> By treating headings as paragraph “titles,”
						they distill the core idea—ensuring that every match rests on
						genuine comprehension, not a lucky guess.
					</p>
				</div>

				<p className='conclusion-text'>
					<em>
						This four-stage sequence—Solve, Reference, Flip, Match—wraps your
						proven techniques into a seamless flow. Students engage fully at
						each step, applying writing-style logic to guarantee accuracy and
						confidence under exam pressure.
					</em>
				</p>

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

import './Home.css'

export function Home() {
	return (
		<div className='container home'>
			<section>
				<h2>📘 Welcome to Your IELTS Strategy Center</h2>
				<p>
					Master each section of the IELTS exam with guided strategies, daily
					practice, and expert tips. Whether you're just starting or aiming for
					Band 8+, this is your home for success.
				</p>
			</section>

			<section>
				<h2>🔍 What You’ll Find Here</h2>
				<ul>
					<li>🧠 Structured Reading Techniques</li>
					<li>🎧 Listening Mastery with a Fourfold Process</li>
					<li>✍️ Writing Task Guides and Model Answers</li>
					<li>🗣 Speaking Practice and Common Question Types</li>
				</ul>
			</section>

			<section>
				<p>
					👉 Ready to begin? Start with the <a href='#'>Reading section</a> or
					explore the <a href='#'>Listening strategy path</a> to begin your
					IELTS journey.
				</p>
			</section>
		</div>
	)
}

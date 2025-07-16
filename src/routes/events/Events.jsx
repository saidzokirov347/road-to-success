import './Events.css'

export function Events() {
	return (
		<div className='container'>
			<h2 className='coming-soon-title'>🚀 What’s Coming Soon</h2>

			<p className='coming-soon-subtext'>
				We will keep you informed about your daily management
			</p>

			<div className='coming-soon-cards'>
				<div className='coming-soon-card'>
					📈 A clean, visual graph showing how well you're staying on track
				</div>
				<div className='coming-soon-card'>
					🧩 Option to keep your profile private when you want space to focus
				</div>
				<div className='coming-soon-card'>
					✍️ A shared essay gallery to publish and explore strong writing
				</div>
				<div className='coming-soon-card'>
					🗓️ Simple tools to update your event progress directly on the site
				</div>
			</div>
		</div>
	)
}

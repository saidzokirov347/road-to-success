import './MaintenancePage.css'

export default function MaintenancePage() {
	return (
		<div className='maintenance-container'>
			<div className='maintenance-content'>
				<img
					src='/maintenance.png' // place your media file in public/ folder
					alt='Under Maintenance'
					className='maintenance-image'
				/>
				<h1>We'll be back soon!</h1>
				<p>
					Sorry for the inconvenience. We're performing some maintenance at the
					moment. We'll be back online shortly!
				</p>
				<p>— ظ Team</p>
			</div>
		</div>
	)
}

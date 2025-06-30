import './ProfileSkeleton.css'

export function ProfileSkeleton() {
	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<div className='profile-header'>
					<div className='avatar-bg'>
						<div className='skeleton skeleton-image'></div>
					</div>
				</div>

				<div className='profile-info'>
					<div className='skeleton-label'></div>
					<div className='skeleton skeleton-input'></div>

					<div className='skeleton-label'></div>
					<div className='skeleton skeleton-input'></div>

					<div className='skeleton-label'></div>
					<div className='skeleton skeleton-input'></div>

					<div className='skeleton-label'></div>
					<div className='skeleton skeleton-textarea'></div>
				</div>
			</div>
		</div>
	)
}

import './ProfileSkeleton.css'

export function ProfileSkeleton() {
	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<div className='profile-header'>
					<div className='avatar-bg'>
						<div className='profile-skeleton profile-skeleton-image'></div>
					</div>
				</div>

				<div className='profile-info'>
					<div className='profile-skeleton-label'></div>
					<div className='profile-skeleton skeleton-input'></div>

					<div className='profile-skeleton-label'></div>
					<div className='profile-skeleton skeleton-input'></div>

					<div className='profile-skeleton-label'></div>
					<div className='profile-skeleton skeleton-input'></div>

					<div className='profile-skeleton-label'></div>
					<div className='profile-skeleton skeleton-textarea'></div>
				</div>
			</div>
		</div>
	)
}

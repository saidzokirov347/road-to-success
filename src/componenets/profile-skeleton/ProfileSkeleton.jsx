import './ProfileSkeleton.css'

export function ProfileSkeleton() {
	return (
		<div className='profile profile-skeleton'>
			<div className='profile-wrapper'>
				<div className='skeleton skeleton-image'></div>
				<div className='skeleton skeleton-name'></div>
				<div className='skeleton skeleton-email'></div>
				<div className='skeleton skeleton-username'></div>
				<div className='skeleton skeleton-bio'></div>
			</div>
		</div>
	)
}

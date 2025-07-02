import './PublicProfileSkeleton.css'

export function PublicProfileSkeleton() {
	return (
		<div className='public-profile-wrapper'>
			<div className='public-profile-card'>
				<div className='public-profile-header'>
					<div className='avatar-bg'>
						<div className='skeleton-circle avatar-skeleton'></div>
					</div>
				</div>

				<div className='public-profile-info'>
					<div className='skeleton-text name-skeleton'></div>
					<div className='skeleton-text username-skeleton'></div>
					<div className='skeleton-text bio-skeleton'></div>
					<div className='skeleton-text bio-skeleton short'></div>
				</div>
			</div>
		</div>
	)
}

import { useEffect } from 'react'
import { ProfileContent } from '../../components/'
import './Profile.css'

export function Profile() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div className='profile-page'>
			<div className='profile-content'>
				<ProfileContent />
			</div>
		</div>
	)
}

import AllUsersSidebar from '../../components/all-users-sidebar/AllUsersSidebar'
import { ProfileContent } from '../../components/profile-content/ProfileContent'
import './Profile.css'

export function Profile() {
	return (
		<div className='profile-page'>
			<div className='profile-content'>
				<ProfileContent />
			</div>
			<div className='sidebar'>
				<AllUsersSidebar />
			</div>
		</div>
	)
}

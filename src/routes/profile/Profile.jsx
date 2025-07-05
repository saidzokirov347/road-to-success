import { ProfileContent } from '../../components/profile-content/ProfileContent'
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

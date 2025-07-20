import { Link } from 'react-router-dom'
import { useGetUserByUidQuery } from '../../store/api/users-api/users.api'

function AuthorLink({ uid }) {
	const { data, isLoading } = useGetUserByUidQuery(uid, { skip: !uid })
	if (!uid) return <span>Unknown</span>
	if (isLoading) return <span>Loading...</span>
	if (!data || !data.username) return <span>Unknown</span>
	return (
		<Link to={`/user/${data.username}`} className='author-link'>
			{data.name}
		</Link>
	)
}

export function PublishedEssayItem({ type, authorUid, nessay, uid }) {
	const maxLength = 180
	let displayEssay = nessay
	if (nessay.length > maxLength) {
		displayEssay = nessay.slice(0, maxLength) + '...'
	}
	return (
		<li className='essay-card'>
			<Link to={`/essay/${uid}`}>
				<p>
					<strong>Type:</strong> {type}
				</p>
				<p className='essay-preview'>
					<strong>Essay:</strong> {displayEssay}
				</p>
				<p>
					<strong>Author:</strong> <AuthorLink uid={authorUid} />
				</p>
			</Link>
		</li>
	)
}

export default PublishedEssayItem

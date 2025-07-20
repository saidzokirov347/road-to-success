import { Link } from 'react-router-dom'
import { PublishedEssayItem } from '../../components/index'
import { useGetEssaysQuery } from '../../store/api/essays-api/essays.api'
import './PublishedEssays.css'

export function PublishedEssays() {
	const { data: essays = [], isLoading } = useGetEssaysQuery()

	return (
		<div className='container essays'>
			{isLoading ? (
				<p>Loading essays...</p>
			) : essays.length === 0 ? (
				<div style={{ textAlign: 'center', marginTop: 32 }}>
					<p>No published essays yet.</p>
					<Link to='/profile/write-essay' className='write-essay-btn'>
						Write an essay
					</Link>
				</div>
			) : (
				<ul>
					{essays.map(e => (
						<PublishedEssayItem
							key={e.id}
							type={e.type}
							authorUid={e.author}
							nessay={e.essay}
							uid={e.id}
						/>
					))}
				</ul>
			)}
		</div>
	)
}

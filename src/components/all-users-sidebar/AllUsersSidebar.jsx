import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useGetUsersQuery } from '../../store/api/user-api/user.api'
import AllUsersSkeleton from '../skeleton/all-users-skeleton/AllUsersSkeleton'
import './AllUsersSidebar.css'

export default function AllUsersSidebar() {
	const [searchTerm, setSearchTerm] = useState('')
	const { currentUser } = useAuth()
	const { data: users = [], isLoading } = useGetUsersQuery()

	const filteredUsers = users
		.filter(user => {
			return (
				user.uid !== currentUser?.uid &&
				user.username !== 'ظ' &&
				user.username?.toLowerCase().includes(searchTerm.toLowerCase())
			)
		})
		.slice(0, 6)

	return (
		<div className='all-users-sidebar'>
			<input
				type='text'
				placeholder='Username'
				className='sidebar-search'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<ul className='user-list'>
				{isLoading
					? [...Array(6)].map((_, i) => <AllUsersSkeleton key={i} />)
					: filteredUsers.map(user => (
							<li key={user.uid}>
								<Link to={`/user/${user.username}`} className='user-link'>
									<img
										src={user.profileImage || '/men-avatar.jpg'}
										alt={user.username || 'profile-image'}
									/>
									<div className='user-link-content'>
										<span className='user-link-username'>{user.username}</span>
										<span className='user-link-level'>
											Lv.{user.level ?? '?'}
										</span>
									</div>
								</Link>
							</li>
					  ))}
			</ul>
		</div>
	)
}

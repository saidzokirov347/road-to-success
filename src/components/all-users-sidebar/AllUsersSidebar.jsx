import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'
import AllUsersSkeleton from '../skeleton/all-users-skeleton/AllUsersSkeleton'
import './AllUsersSidebar.css'

export default function AllUsersSidebar() {
	const [users, setUsers] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(true)
	const { currentUser } = useAuth()

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'users'))
				const usersList = []
				querySnapshot.forEach(doc => {
					const data = doc.data()
					usersList.push({
						uid: doc.id,
						name: data.name,
						username: data.username,
						profileImage: data.profileImage,
						level: data.level,
					})
				})
				setUsers(usersList)
			} catch (error) {
				console.error('Error fetching users:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchUsers()
	}, [])

	const filteredUsers = users
		.filter(user => user.uid !== currentUser?.uid)
		.filter(user =>
			user.username?.toLowerCase().includes(searchTerm.toLowerCase())
		)
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
				{loading
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

import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'
import './AllUsersSidebar.css'

export default function AllUsersSidebar() {
	const [users, setUsers] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const { currentUser } = useAuth()

	useEffect(() => {
		const fetchUsers = async () => {
			const querySnapshot = await getDocs(collection(db, 'users'))
			const usersList = []
			querySnapshot.forEach(doc => {
				const data = doc.data()
				usersList.push({
					uid: doc.id,
					name: data.name,
					username: data.username,
					profileImage: data.profileImage,
				})
			})
			setUsers(usersList)
		}
		fetchUsers()
	}, [])

	const filteredUsers = users
		.filter(user => user.uid !== currentUser?.uid)
		.filter(user =>
			user.username?.toLowerCase().includes(searchTerm.toLowerCase())
		)

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
				{filteredUsers.map(user => (
					<li key={user.uid}>
						<Link to={`/user/${user.username}`} className='user-link'>
							<img
								src={user.profileImage || '/men-avatar.jpg'}
								alt={user.username || 'profile-image'}
							/>
							<span>{user.username}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'
import './Profile.css'

export function Profile() {
	const { currentUser } = useAuth()
	const [bio, setBio] = useState('')
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [profileImage, setProfileImage] = useState('')
	const [email, setEmail] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		const fetchProfile = async () => {
			if (!currentUser?.uid) return
			const userRef = doc(db, 'users', currentUser.uid)
			const snap = await getDoc(userRef)
			if (snap.exists()) {
				const data = snap.data()
				setBio(data.bio || '')
				setName(data.name || '')
				setUsername(data.username || '')
				setProfileImage(data.profileImage || '')
				setEmail(data.email || '')
			}
		}
		fetchProfile()
	}, [currentUser])

	const handleSave = async e => {
		e.preventDefault()
		try {
			const userRef = doc(db, 'users', currentUser.uid)
			await updateDoc(userRef, {
				bio,
				name,
				username,
				email,
				profileImage,
			})
			alert('Profile updated successfully!')
			setIsEditing(false)
		} catch (err) {
			console.error('Failed to update profile:', err)
		}
	}

	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<img
					src={profileImage || currentUser.photoURL || '/men-avatar.jpg'}
					alt='Profile'
					className='profile-image'
				/>
				{isEditing && (
					<input
						type='text'
						value={profileImage}
						onChange={e => setProfileImage(e.target.value)}
						className='profile-bio'
						placeholder='Profile Image URL'
					/>
				)}

				<h2 className='profile-name'>
					{isEditing ? (
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							className='profile-bio'
							placeholder='Name'
						/>
					) : (
						name
					)}
				</h2>

				<p className='profile-email'>
					{isEditing ? (
						<input
							type='text'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='profile-bio'
							placeholder='Email'
						/>
					) : (
						email
					)}
				</p>

				<p className='profile-email'>
					{isEditing ? (
						<input
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='profile-bio'
							placeholder='Username'
						/>
					) : (
						`@${username}`
					)}
				</p>

				{isEditing ? (
					<textarea
						className='profile-bio'
						rows='5'
						placeholder='Write your bio...'
						value={bio}
						onChange={e => setBio(e.target.value)}
					></textarea>
				) : (
					<p className='profile-email'>{bio}</p>
				)}

				<button
					className='save-button'
					onClick={() => setIsEditing(prev => !prev)}
					style={{ marginBottom: '20px' }}
				>
					{isEditing ? 'Cancel' : 'Change Info'}
				</button>

				{isEditing && (
					<button className='save-button' onClick={handleSave}>
						Save Changes
					</button>
				)}
			</div>
		</div>
	)
}

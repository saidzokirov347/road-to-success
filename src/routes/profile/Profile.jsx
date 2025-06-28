import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { ProfileSkeleton } from '../../componenets/profile-skeleton/ProfileSkeleton'
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
	const [loading, setLoading] = useState(true)

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
			} else {
				const defaultData = {
					bio: '',
					name: currentUser.displayName || '',
					username: '',
					profileImage: currentUser.photoURL || '',
					email: currentUser.email || '',
				}
				await setDoc(userRef, defaultData)
				setBio(defaultData.bio)
				setName(defaultData.name)
				setUsername(defaultData.username)
				setProfileImage(defaultData.profileImage)
				setEmail(defaultData.email)
			}
			setLoading(false)
		}
		fetchProfile()
	}, [currentUser])

	const handleSave = async e => {
		e.preventDefault()
		try {
			const userRef = doc(db, 'users', currentUser.uid)
			const docSnap = await getDoc(userRef)

			if (docSnap.exists()) {
				await updateDoc(doc(db, 'users', currentUser.uid), {
					name,
					username,
					email,
					bio,
					profileImage,
				})
			} else {
				await setDoc(userRef, {
					bio,
					name,
					username,
					email,
					profileImage,
				})
			}

			alert('Profile updated successfully!')
			setIsEditing(false)
		} catch (err) {
			console.error('Failed to update profile:', err)
		}
	}

	if (loading) return <ProfileSkeleton />
	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<img
					src={profileImage || '/men-avatar.jpg'}
					alt='Profile'
					className='profile-image'
				/>

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

				{isEditing ? (
					<></>
				) : (
					<button
						className='save-button'
						onClick={() => setIsEditing(prev => !prev)}
						style={{ marginBottom: '20px' }}
					>
						Change Info
					</button>
				)}

				{isEditing && (
					<div className='button-row'>
						<button className='save-button' onClick={handleSave}>
							Save Changes
						</button>
						<button className='save-button' onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

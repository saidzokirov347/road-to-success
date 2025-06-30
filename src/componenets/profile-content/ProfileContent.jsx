import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { useEffect, useState } from 'react'

import { LuPencil, LuSave } from 'react-icons/lu'

import { ProfileSkeleton } from '../../componenets/profile-skeleton/ProfileSkeleton'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'

import { showToast } from '../../utils/toastHelper'

import './ProfileContent.css'

export function ProfileContent() {
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

	const handleToggleEdit = async () => {
		if (isEditing) {
			// Save changes
			try {
				const userRef = doc(db, 'users', currentUser.uid)
				await updateDoc(userRef, {
					name,
					username,
					email,
					bio,
					profileImage,
				})
				showToast.successProfileUpdate()
			} catch (err) {
				console.error('Error saving profile:', err)
				showToast.errorProfileUpdate()
			}
		}
		setIsEditing(prev => !prev)
	}

	console.log(currentUser)

	if (loading) return <ProfileSkeleton />

	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<div className='profile-header'>
					<div className='avatar-bg'>
						<img
							src={currentUser.photoURL || '/men-avatar.jpg'}
							alt='Profile'
							className='profile-image'
						/>
					</div>
				</div>

				<div className='profile-info'>
					<label>Full Name</label>
					<input
						className='profile-input'
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Full Name'
						disabled={!isEditing}
					/>

					<label>Email address</label>
					<input
						className='profile-input'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Email'
						disabled={!isEditing}
					/>

					<label>Username</label>
					<input
						className='profile-input'
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder='Username'
						disabled={!isEditing}
					/>

					<label>Bio</label>
					<textarea
						className='profile-bio'
						rows='3'
						placeholder='Write your bio...'
						value={bio}
						onChange={e => setBio(e.target.value)}
						disabled={!isEditing}
					/>
				</div>

				<div className='button-row'>
					<button className='save-button' onClick={handleToggleEdit}>
						{isEditing ? (
							<>
								<span>Save</span>
								<LuSave />
							</>
						) : (
							<>
								<span>Edit</span>
								<LuPencil />
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

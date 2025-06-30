import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'

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
	const [exp, setExp] = useState(0)
	const [level, setLevel] = useState(1)
	const [isEditing, setIsEditing] = useState(false)
	const [usernameIsNew, setUsernameIsNew] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	const [loading, setLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)

	const usernameRef = useRef(null)

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
				setExp(data.exp || 0)
				setLevel(data.level || 1)

				if (!data.username) {
					setUsernameIsNew(true)
				}

				// 🔥 Fix incorrect level based on EXP
				const levelThresholds = [0, 1000, 2000, 3000, 4000, 5000]
				let correctLevel = 1
				for (let i = 1; i < levelThresholds.length; i++) {
					if ((data.exp || 0) >= levelThresholds[i]) {
						correctLevel = i + 1
					}
				}
				correctLevel = Math.min(correctLevel, 5)

				if (data.level !== correctLevel) {
					await updateDoc(userRef, {
						level: correctLevel,
					})
					setLevel(correctLevel)
				}
			} else {
				const defaultData = {
					bio: '',
					name: currentUser.displayName || '',
					username: '',
					profileImage: currentUser.photoURL || '',
					email: currentUser.email || '',
					exp: 0,
					level: 1,
				}
				await setDoc(userRef, defaultData)
				setBio(defaultData.bio)
				setName(defaultData.name)
				setUsername(defaultData.username)
				setProfileImage(defaultData.profileImage)
				setEmail(defaultData.email)
				setExp(defaultData.exp)
				setLevel(defaultData.level)
				setUsernameIsNew(true)
			}

			setLoading(false)
		}

		fetchProfile()
	}, [currentUser])

	useEffect(() => {
		if (usernameIsNew && username === '') {
			usernameRef.current?.focus()
		}
	}, [usernameIsNew, username])

	const handleToggleEdit = async () => {
		if (isEditing) {
			if (!username.trim()) {
				setUsernameError(true)
				showToast.error('Username cannot be empty.')
				usernameRef.current?.focus()
				return
			}

			setIsSaving(true)
			try {
				const userRef = doc(db, 'users', currentUser.uid)
				await updateDoc(userRef, {
					name,
					username,
					email,
					bio,
					profileImage,
				})
				setUsernameIsNew(false)
				showToast.successProfileUpdate()
			} catch (err) {
				console.error('Error saving profile:', err)
				showToast.errorProfileUpdate()
			}
			setIsSaving(false)
			setIsEditing(false)
			setUsernameError(false)
		} else {
			setIsEditing(true)
		}
	}

	if (loading) return <ProfileSkeleton />

	const getMaxExpForLevel = level => {
		if (level === 1) return 1000
		if (level === 2) return 2000
		if (level === 3) return 3000
		if (level === 4) return 4000
		return 5000 // level 5+
	}

	const getMinExpForLevel = level => {
		if (level === 1) return 0
		if (level === 2) return 1000
		if (level === 3) return 2000
		if (level === 4) return 3000
		return 4000
	}

	const minExp = getMinExpForLevel(level)
	const maxExp = getMaxExpForLevel(level)
	const expInCurrentLevel = exp - minExp
	const expRange = maxExp - minExp
	const progress = Math.min((expInCurrentLevel / expRange) * 100, 100)
	const levelClass = `level-${Math.min(level, 5)}`

	return (
		<div className='profile'>
			<div className='profile-wrapper'>
				<div className='profile-header'>
					<div className='avatar-bg'>
						<img
							src={profileImage || currentUser.photoURL || '/men-avatar.jpg'}
							alt='Profile'
							className='profile-image'
						/>
					</div>

					<div className='rank-info'>
						<div className='level-text'>Level {level}</div>
						<div className='progress-bar'>
							<div
								className={`progress-fill ${levelClass}`}
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<small>
							{exp} / {maxExp} EXP
						</small>
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
						ref={usernameRef}
						className={`profile-input ${usernameError ? 'input-warning' : ''}`}
						value={username}
						onChange={e => {
							setUsername(e.target.value)
							if (e.target.value.trim() !== '') {
								setUsernameError(false)
							}
						}}
						placeholder='Username'
						disabled={!isEditing && !usernameIsNew}
					/>
					{usernameError && (
						<span className='error-text'>Username must not be empty</span>
					)}

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
					<button
						className='save-button'
						onClick={handleToggleEdit}
						disabled={isSaving}
					>
						{isSaving ? (
							<span className='loader'></span>
						) : isEditing ? (
							<span>Okay</span>
						) : (
							<span>Edit</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

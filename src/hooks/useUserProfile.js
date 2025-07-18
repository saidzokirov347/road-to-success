import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import {
	LEVEL_THRESHOLDS,
	MAX_LEVEL,
	getDefaultProfileData,
} from '../constants/user.constants'
import { useAuth } from '../context/authContext'
import { db } from '../firebase/firebase'
import { getExpRangeForLevel } from '../utils/exp'
import { showToast } from '../utils/toastHelper'

export function useUserProfile() {
	const { currentUser, triggerUsernameUpdate } = useAuth()

	const [bio, setBio] = useState('')
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [profileImage, setProfileImage] = useState('')
	const [email, setEmail] = useState('')
	const [exp, setExp] = useState(0)
	const [level, setLevel] = useState(1)
	const [teacher, setTeacher] = useState('')
	const [listeningExp, setListeningExp] = useState(0)
	const [readingExp, setReadingExp] = useState(0)
	const [writingExp, setWritingExp] = useState(0)
	const [speakingExp, setSpeakingExp] = useState(0)

	const [loading, setLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [usernameIsNew, setUsernameIsNew] = useState(false)
	const [usernameError, setUsernameError] = useState(false)

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
				setTeacher(data.teacher || '')
				setListeningExp(data.listeningExp || 0)
				setReadingExp(data.readingExp || 0)
				setWritingExp(data.writingExp || 0)
				setSpeakingExp(data.speakingExp || 0)

				const totalExp =
					(data.listeningExp || 0) +
					(data.readingExp || 0) +
					(data.writingExp || 0) +
					(data.speakingExp || 0)

				setExp(totalExp)

				// Level update
				let correctLevel = 1
				for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
					if (totalExp >= LEVEL_THRESHOLDS[i]) {
						correctLevel = i + 1
					}
				}
				correctLevel = Math.min(correctLevel, MAX_LEVEL)

				setLevel(correctLevel)

				if (data.level !== correctLevel) {
					await updateDoc(userRef, { level: correctLevel })
				}

				if (!data.username) setUsernameIsNew(true)
			} else {
				const defaultData = getDefaultProfileData(currentUser)
				await setDoc(userRef, defaultData)
				setBio(defaultData.bio)
				setName(defaultData.name)
				setUsername(defaultData.username)
				setProfileImage(defaultData.profileImage)
				setEmail(defaultData.email)
				setExp(defaultData.exp)
				setLevel(defaultData.level)
				setTeacher(defaultData.teacher || '')
				setListeningExp(defaultData.listeningExp)
				setReadingExp(defaultData.readingExp)
				setWritingExp(defaultData.writingExp)
				setSpeakingExp(defaultData.speakingExp)
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

	const handleSave = async () => {
		if (!username.trim()) {
			setUsernameError(true)
			showToast.error('Username cannot be empty.')
			usernameRef.current?.focus()
			return
		}

		if (!teacher.trim()) {
			showToast.error('Please select your teacher.')
			return
		}

		setIsSaving(true)
		try {
			const userRef = doc(db, 'users', currentUser.uid)
			await updateDoc(userRef, {
				name,
				username: username.toLowerCase(),
				email,
				bio,
				profileImage,
				teacher,
			})
			setUsernameIsNew(false)

			triggerUsernameUpdate()
			showToast.successProfileUpdate()
		} catch (err) {
			console.error('Error saving profile:', err)
			showToast.errorProfileUpdate()
		}
		setIsSaving(false)
		setIsEditing(false)
		setUsernameError(false)
	}

	const toggleEdit = () => {
		if (isEditing) {
			handleSave()
		} else {
			setIsEditing(true)
		}
	}

	const { minExp, maxExp } = getExpRangeForLevel(level)
	const expInCurrentLevel = exp - minExp
	const progress = Math.min((expInCurrentLevel / (maxExp - minExp)) * 100, 100)
	const levelClass = `level-${Math.min(level, MAX_LEVEL)}`

	return {
		bio,
		name,
		username,
		profileImage,
		email,
		level,
		loading,
		isEditing,
		isSaving,
		usernameError,
		usernameIsNew,
		usernameRef,
		progress,
		levelClass,
		teacher,
		setBio,
		setName,
		setUsername,
		setEmail,
		setTeacher,
		toggleEdit,
		listeningExp,
		readingExp,
		writingExp,
		speakingExp,
		exp,
	}
}

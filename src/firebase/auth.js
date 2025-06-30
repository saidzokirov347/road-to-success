import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	updatePassword,
	updateProfile,
} from 'firebase/auth'

const levelThresholds = [0, 1000, 2000, 3000, 4000, 5000]

export const doSignInWithEmailAndPassword = async (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
}

export const doSignUpWithGoogle = async (bio = '') => {
	const provider = new GoogleAuthProvider()
	const result = await signInWithPopup(auth, provider)

	const userDoc = doc(db, 'users', result.user.uid)
	const userSnap = await getDoc(userDoc)

	if (!userSnap.exists()) {
		await setDoc(userDoc, {
			uid: result.user.uid,
			name: result.user.displayName,
			email: result.user.email,
			username: result.user.displayName?.toLowerCase().replace(/\s+/g, '_'),
			profileImage: result.user.photoURL,
			bio: bio || '',
			createdAt: new Date().toISOString(),
			exp: 0,
			level: 1,
		})
	}

	return result
}

export const doSignInWithGoogle = async () => {
	const provider = new GoogleAuthProvider()
	const result = await signInWithPopup(auth, provider)

	return result
}

export const doSignOut = () => {
	return auth.signOut()
}

export const doPasswordReset = email => {
	return sendPasswordResetEmail(auth, email)
}

export const doPasswordChange = password => {
	return updatePassword(auth.currentUser, password)
}

export const doSendEmailVerification = () => {
	return sendEmailVerification(auth.currentUser, {
		url: `${window.location.origin}/home`,
	})
}

export const doCreateUserWithEmailAndPassword = async (
	email,
	password,
	additionalData
) => {
	const result = await createUserWithEmailAndPassword(auth, email, password)

	await updateProfile(result.user, {
		displayName: additionalData.name,
	})

	await setDoc(doc(db, 'users', result.user.uid), {
		uid: result.user.uid,
		name: additionalData.name,
		username: additionalData.username,
		email: result.user.email,
		bio: additionalData.bio || '',
		createdAt: new Date().toISOString(),
		exp: 0,
		level: 1,
	})

	return result
}

export const addExpToUser = async (userId, expToAdd) => {
	const userRef = doc(db, 'users', userId)
	const snap = await getDoc(userRef)

	if (!snap.exists()) return

	const user = snap.data()
	const currentExp = user.exp || 0
	const newExp = currentExp + expToAdd

	let newLevel = 1
	for (let i = 1; i < levelThresholds.length; i++) {
		if (newExp >= levelThresholds[i]) {
			newLevel = i + 1
		}
	}
	newLevel = Math.min(newLevel, 5)

	await updateDoc(userRef, {
		exp: newExp,
		level: newLevel,
	})
}

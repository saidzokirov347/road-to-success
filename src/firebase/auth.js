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
			bio: bio || '', // empty at first
			createdAt: new Date().toISOString(),
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
		photoURL: additionalData.profileImage,
	})

	await setDoc(doc(db, 'users', result.user.uid), {
		uid: result.user.uid,
		name: additionalData.name,
		username: additionalData.username,
		email: result.user.email,
		profileImage: additionalData.profileImage,
		bio: additionalData.bio || '',
		createdAt: new Date().toISOString(),
	})

	return result
}

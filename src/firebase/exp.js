import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

const levelThresholds = [0, 1000, 2000, 3000, 4000, 5000]

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

export const removeExpFromUser = async (userId, expToRemove) => {
	const userRef = doc(db, 'users', userId)
	const snap = await getDoc(userRef)

	if (!snap.exists()) return

	const user = snap.data()
	const currentExp = user.exp || 0
	const newExp = Math.max(currentExp - expToRemove, 0)

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

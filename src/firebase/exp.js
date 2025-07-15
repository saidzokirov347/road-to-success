import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { LEVEL_THRESHOLDS } from '../constants/user.constants'
import { db } from './firebase'

const calculateLevel = totalExp => {
	let level = 1
	for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
		if (totalExp >= LEVEL_THRESHOLDS[i]) {
			level = i + 1
		}
	}
	return Math.min(level, 5)
}

export const addExpToUser = async (
	userId,
	amount,
	section = 'listeningExp'
) => {
	if (!userId || typeof amount !== 'number') return

	const userRef = doc(db, 'users', userId)
	const snap = await getDoc(userRef)
	if (!snap.exists()) return

	const data = snap.data()

	const updatedSectionExp = Math.max((data[section] || 0) + amount, 0)

	// Calculate total exp based on all sections
	const listening =
		section === 'listeningExp' ? updatedSectionExp : data.listeningExp || 0
	const reading =
		section === 'readingExp' ? updatedSectionExp : data.readingExp || 0
	const writing =
		section === 'writingExp' ? updatedSectionExp : data.writingExp || 0
	const speaking =
		section === 'speakingExp' ? updatedSectionExp : data.speakingExp || 0

	const totalExp = listening + reading + writing + speaking
	const newLevel = calculateLevel(totalExp)

	await updateDoc(userRef, {
		[section]: updatedSectionExp,
		level: newLevel,
	})
}

export const updateUserCategoryExpByAmount = async (
	userId,
	changeAmount,
	expField
) => {
	const userRef = doc(db, 'users', userId)
	const snap = await getDoc(userRef)
	if (!snap.exists()) return

	const data = snap.data()
	const currentExp = data[expField] || 0
	const newExp = Math.max(currentExp + changeAmount, 0)

	await updateDoc(userRef, {
		[expField]: newExp,
	})
}

// src/firebase/exp.js

import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { LEVEL_THRESHOLDS } from '../constants/user.constants'
import { db } from './firebase'

const calculateLevel = exp => {
	let level = 1
	for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
		if (exp >= LEVEL_THRESHOLDS[i]) {
			level = i + 1
		}
	}
	return Math.min(level, 5)
}

export const updateUserExpByAmount = async (userId, changeAmount) => {
	const userRef = doc(db, 'users', userId)
	const snap = await getDoc(userRef)
	if (!snap.exists()) return

	const data = snap.data()
	const currentExp = data.exp || 0
	const newExp = Math.max(currentExp + changeAmount, 0)
	const newLevel = calculateLevel(newExp)

	await updateDoc(userRef, {
		exp: newExp,
		level: newLevel,
	})
}

// NEW FUNCTION — call this to sync level with EXP
export const syncUserLevelWithExp = async userId => {
	const userRef = doc(db, 'users', userId)
	const snap = await getDoc(userRef)
	if (!snap.exists()) return

	const data = snap.data()
	const exp = data.exp || 0
	const correctLevel = calculateLevel(exp)

	if (data.level !== correctLevel) {
		await updateDoc(userRef, {
			level: correctLevel,
		})
	}
}

export const addExpToUser = (userId, exp) => updateUserExpByAmount(userId, exp)
export const removeExpFromUser = (userId, exp) =>
	updateUserExpByAmount(userId, -exp)

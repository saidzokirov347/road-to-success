import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'

export async function getUserByUsername(username) {
	try {
		const q = query(collection(db, 'users'), where('username', '==', username))
		const snapshot = await getDocs(q)
		if (!snapshot.empty) {
			return snapshot.docs[0].data()
		}
		return null
	} catch (err) {
		console.error('Error fetching user by username:', err)
		return null
	}
}

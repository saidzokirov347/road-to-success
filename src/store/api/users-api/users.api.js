import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { api } from '../api'

export const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query({
			async queryFn() {
				try {
					const querySnapshot = await getDocs(collection(db, 'users'))
					const users = querySnapshot.docs.map(doc => {
						const data = doc.data()
						return {
							id: doc.id,
							uid: data.uid || doc.id,
							name: data.name || '',
							username: data.username || '',
							profileImage: data.profileImage || '',
							level: data.level || '',
						}
					})
					return { data: users }
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),

		getUserByUsername: builder.query({
			async queryFn(username) {
				try {
					const q = query(
						collection(db, 'users'),
						where('username', '==', username)
					)
					const snapshot = await getDocs(q)
					if (!snapshot.empty) {
						const doc = snapshot.docs[0]
						const data = doc.data()
						return {
							data: {
								id: doc.id,
								uid: data.uid || doc.id,
								name: data.name || '',
								username: data.username || '',
								profileImage: data.profileImage || '',
								level: data.level || '',
								listeningExp: data.listeningExp,
								readingExp: data.readingExp,
								writingExp: data.writingExp,
								speakingExp: data.speakingExp,
							},
						}
					}
					return { data: null }
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),

		getUserByUid: builder.query({
			async queryFn(uid) {
				try {
					const userDoc = await getDoc(doc(db, 'users', uid))
					if (userDoc.exists()) {
						const data = userDoc.data()
						return {
							data: {
								id: userDoc.id,
								uid: userDoc.id,
								name: data.name || '',
								username: data.username || '',
								profileImage: data.profileImage || '',
								level: data.level || '',
							},
						}
					}
					return { data: null }
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),
	}),
})

export const {
	useGetUsersQuery,
	useGetUserByUsernameQuery,
	useGetUserByUidQuery,
} = usersApi

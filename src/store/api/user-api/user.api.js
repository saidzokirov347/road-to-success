import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { api } from '../api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query({
			async queryFn() {
				try {
					const querySnapshot = await getDocs(collection(db, 'users'))
					const users = []
					querySnapshot.forEach(doc => {
						const data = doc.data()
						users.push({
							uid: doc.id,
							name: data.name,
							username: data.username,
							profileImage: data.profileImage,
							level: data.level,
						})
					})
					return { data: users }
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export const { useGetUsersQuery } = userApi

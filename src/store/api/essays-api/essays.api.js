import { addDoc, collection, getDocs } from 'firebase/firestore'
import { api } from '../api'
import { db } from '../firebase/firebase'

export const essayApi = api.injectEndpoints({
	endpoints: builder => ({
		getEssays: builder.query({
			async queryFn() {
				try {
					const querySnapshot = await getDocs(collection(db, 'essays'))
					const essays = []
					querySnapshot.forEach(doc => {
						const data = doc.data()
						essays.push({
							id: doc.id,
							author: data.author,
							isChecked: data.isChecked,
							isAllowedToPublish: data.isAllowedToPublish,
							essay: data.essay,
							type: data.type,
						})
					})
					return { data: essays }
				} catch (error) {
					return { error }
				}
			},
		}),
		addEssay: builder.mutation({
			async queryFn(newEssay) {
				try {
					const docRef = await addDoc(collection(db, 'essays'), newEssay)
					return { data: { id: docRef.id, ...newEssay } }
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export const { useGetEssaysQuery, useAddEssayMutation } = essayApi

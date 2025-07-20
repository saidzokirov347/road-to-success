import { addDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../../firebase/firebase'
import { api } from '../api'

export const essaysApi = api.injectEndpoints({
	endpoints: builder => ({
		getEssays: builder.query({
			async queryFn() {
				try {
					const querySnapshot = await getDocs(collection(db, 'essays'))
					const essays = []
					querySnapshot.forEach(doc => {
						const data = doc.data()
						if (
							data.isChecked === false &&
							data.isApprovedToPublish === false
						) {
							essays.push({
								id: doc.id,
								author: data.author,
								isChecked: data.isChecked,
								isApprovedToPublish: data.isApprovedToPublish,
								essay: data.essay,
								type: data.type,
								question: data.question, // include question
							})
						}
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
					const currentUser = auth.currentUser
					if (!currentUser) throw new Error('User not authenticated')

					const essayData = {
						author: currentUser.uid,
						type: newEssay.type,
						question: newEssay.question,
						isChecked: false,
						isApprovedToPublish: false,
						essay: newEssay.essay,
					}

					const docRef = await addDoc(collection(db, 'essays'), essayData)
					return { data: { id: docRef.id, ...essayData } }
				} catch (error) {
					return { error }
				}
			},
		}),
	}),
})

export const { useGetEssaysQuery, useAddEssayMutation } = essaysApi

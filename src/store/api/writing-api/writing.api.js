import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	Timestamp,
} from 'firebase/firestore'
import { db } from '../../../firebase/firebase'

import { api } from '../api'

export const writingApi = api.injectEndpoints({
	endpoints: builder => ({
		getWritingTasks: builder.query({
			async queryFn() {
				try {
					const snapshot = await getDocs(collection(db, 'writingTasks'))
					const tasks = snapshot.docs.map(doc => {
						const data = doc.data()
						return {
							id: doc.id,
							...data,
							createdAt: data.createdAt?.toDate().toISOString() || null,
							updatedAt: data.updatedAt?.toDate().toISOString() || null,
						}
					})
					return { data: tasks }
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),
		getWritingTaskById: builder.query({
			async queryFn(id) {
				try {
					const docRef = doc(db, 'writingTasks', id)
					const docSnap = await getDoc(docRef)
					if (!docSnap.exists()) {
						return { error: { message: 'Task not found' } }
					}
					const data = docSnap.data()
					return {
						data: {
							id: docSnap.id,
							...data,
							createdAt: data.createdAt?.toDate().toISOString() || null,
							updatedAt: data.updatedAt?.toDate().toISOString() || null,
						},
					}
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),
		createWritingTask: builder.mutation({
			async queryFn(newTask) {
				try {
					const docRef = await addDoc(collection(db, 'writingTasks'), {
						imageUrl: newTask.imageUrl || '',
						question: newTask.question || '',
						createdAt: Timestamp.now(),
						updatedAt: Timestamp.now(),
					})
					return { data: { id: docRef.id, ...newTask } }
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),

		submitWritingTaskEssay: builder.mutation({
			async queryFn({ taskId, essay, userId }) {
				try {
					const taskRef = doc(db, 'writingTasks', taskId)
					const entry = {
						writtenBy: userId,
						essay,
						score: null,
						checked: false,
						isAllowToPublish: false,
						submittedAt: Timestamp.now(),
					}
					await updateDoc(taskRef, {
						written: arrayUnion(entry),
						updatedAt: Timestamp.now(),
					})
					return { data: entry }
				} catch (error) {
					return { error: { message: error.message } }
				}
			},
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetWritingTasksQuery,
	useGetWritingTaskByIdQuery,
	useCreateWritingTaskMutation,
	useSubmitWritingTaskEssayMutation,
} = writingApi

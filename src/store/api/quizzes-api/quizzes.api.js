import { api } from '../api'

export const quizApi = api.injectEndpoints({
	endpoints: builder => ({
		getQuizById: builder.query({
			query: id => `get-quiz/${id}`,
			transformResponse: response => response.innerData || {},
		}),
	}),
})
export const { useGetQuizByIdQuery } = quizApi

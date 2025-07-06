import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'quizApi',
	tagTypes: ['Quiz', 'User'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://road-to-success-backend.onrender.com/',
	}),
	endpoints: builder => ({
		getQuizzes: builder.query({
			query: () => 'get-quizzes',
			transformResponse: response => response.innerData || [],
		}),
	}),
})

export const { useGetQuizzesQuery } = api

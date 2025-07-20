import {
	Events,
	Home,
	Listening,
	Login,
	Profile,
	ProtectedRoute,
	PublicProfile,
	PublishedEssays,
	QuizPage,
	Quizzes,
	Reading,
	Register,
	Speaking,
	WriteEssay,
	Writing,
} from '../routes'

export const routes = [
	{ path: '/', element: <ProtectedRoute element={<Home />} /> },
	{ path: '/reading', element: <ProtectedRoute element={<Reading />} /> },
	{ path: '/listening', element: <ProtectedRoute element={<Listening />} /> },
	{ path: '/speaking', element: <ProtectedRoute element={<Speaking />} /> },
	{ path: '/writing', element: <ProtectedRoute element={<Writing />} /> },
	{
		path: '/essays',
		element: <ProtectedRoute element={<PublishedEssays />} />,
	},
	{ path: '/profile', element: <ProtectedRoute element={<Profile />} /> },
	{
		path: '/user/:username',
		element: <ProtectedRoute element={<PublicProfile />} />,
	},
	{ path: '/events', element: <ProtectedRoute element={<Events />} /> },
	{ path: '/quizzes', element: <ProtectedRoute element={<Quizzes />} /> },
	{ path: '/quiz/:id', element: <ProtectedRoute element={<QuizPage />} /> },
	{
		path: '/profile/write-essay',
		element: <ProtectedRoute element={<WriteEssay />} />,
	},
	{
		path: '/login',
		element: <ProtectedRoute element={<Login />} requireAuth={false} />,
	},
	{
		path: '/register',
		element: <ProtectedRoute element={<Register />} requireAuth={false} />,
	},
]

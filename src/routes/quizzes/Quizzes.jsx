// src/pages/Quizzes.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Quizzes.css'

export default function Quizzes() {
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const res = await fetch(
					'https://road-to-success-backend.onrender.com/get-quizzes'
				)
				const data = await res.json()

				if (Array.isArray(data.innerData)) {
					setQuizzes(data.innerData)
				} else {
					console.error('Expected innerData to be an array but got:', data)
					setQuizzes([])
				}
			} catch (err) {
				console.error('Failed to fetch quizzes:', err)
				setQuizzes([])
			} finally {
				setLoading(false)
			}
		}
		fetchQuizzes()
	}, [])

	if (loading) return <div className='loader'></div>

	return (
		<div className='quiz-page'>
			<h2>📝 Available Quizzes</h2>
			{quizzes.length > 0 ? (
				<ul className='quiz-list'>
					{quizzes.map((quiz, i) => (
						<li key={quiz.id || i}>
							<Link to={`/quiz/${quiz._id}`} className='quiz-link'>
								➡️ {quiz.name}
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p>No quizzes available.</p>
			)}
		</div>
	)
}

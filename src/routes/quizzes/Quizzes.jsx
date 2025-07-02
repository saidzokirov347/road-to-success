import { Link } from 'react-router-dom'
import { useGetQuizzesQuery } from '../../store/api/api'
import './Quizzes.css'

export default function Quizzes() {
	const { data: quizzes = [], isLoading, isError } = useGetQuizzesQuery()

	if (isLoading) return <div className='loader'></div>
	if (isError) return <p>Failed to load quizzes.</p>

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

import { Link } from 'react-router-dom'
import { useGetQuizzesQuery } from '../../store/api/api'
import './Quizzes.css'

export default function Quizzes() {
	const { data: quizzes = [], isLoading, isError } = useGetQuizzesQuery()

	if (isLoading) return <div className='loader'></div>
	if (isError) return <p className='error'>❌ Failed to load quizzes.</p>

	return (
		<div className='quiz-page container'>
			<h2>📚 Available Quizzes</h2>
			<div className='quiz-grid'>
				{quizzes.map((quiz, i) => {
					const createdAt = new Date(quiz.createdAt)
					const isNew =
						Date.now() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000 // 7 days
					const isCompleted = quiz?.isCompleted // This could come from user progress API

					return (
						<Link
							to={`/quiz/${quiz._id}`}
							className='quiz-card'
							key={quiz._id || i}
						>
							<div className='quiz-header'>
								<h3>{quiz.name}</h3>
								<div className='badges'>
									{isNew && <span className='badge new'>New</span>}
									{isCompleted && <span className='badge completed'>Done</span>}
								</div>
							</div>
							<p className='quiz-desc'>
								{quiz.description || 'No description available.'}
							</p>
							<div className='quiz-meta'>
								<span>🧩 {quiz.questions?.length || 0} Questions</span>
								<span>⭐ {quiz.expOfQuiz || 0} EXP</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

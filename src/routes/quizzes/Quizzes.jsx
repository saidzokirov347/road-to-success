import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QuizListSkeleton } from '../../components/index'
import { useGetQuizzesQuery } from '../../store/api/api'
import './Quizzes.css'

export function Quizzes() {
	const { data: quizzes = [], isLoading, isError } = useGetQuizzesQuery()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (isLoading) return <QuizListSkeleton />
	if (isError) return <p className='error'>❌ Failed to load quizzes.</p>
	if (!quizzes.length)
		return (
			<p className='quizzes-error'>
				🗒️ No quizzes are available at the moment.
			</p>
		)

	return (
		<div className='quiz-page container'>
			<h2 className='quiz-page-title'>📚 Available Quizzes</h2>
			<div className='quiz-grid'>
				{quizzes.map((quiz, i) => {
					const createdAt = new Date(quiz.createdAt)
					const isNew =
						Date.now() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
					const isCompleted = quiz?.isCompleted

					return (
						<Link
							to={`/quiz/${quiz._id}`}
							className='quiz-card'
							key={quiz._id || i}
						>
							<div className='quizzes-header'>
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
								<span>{quiz.quizTime} min</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

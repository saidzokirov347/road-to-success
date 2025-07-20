import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizPageSkeleton } from '../../components/index'
import { useAuth } from '../../context/authContext'
import { updateUserCategoryExpByAmount } from '../../firebase/exp'
import { useGetQuizByIdQuery } from '../../store/api/quizzes-api/quizzes.api'
import './QuizPage.css'

export function QuizPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { currentUser } = useAuth()
	const { data: quiz, isLoading } = useGetQuizByIdQuery(id)

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedAnswers, setSelectedAnswers] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const [score, setScore] = useState(0)

	const handleSelect = option => {
		if (!submitted) {
			setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }))
		}
	}

	const handleNext = () => {
		if (currentQuestionIndex < quiz.questions.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1)
		} else {
			handleSubmit()
		}
	}

	const handleSubmit = async () => {
		if (!quiz || !quiz.questions) return
		const total = quiz.questions.length
		let correct = 0

		quiz.questions.forEach((q, i) => {
			if (selectedAnswers[i] === q.correctAnswer) correct++
		})

		setScore(correct)
		setSubmitted(true)

		if (!currentUser) return

		const percent = (correct / total) * 100
		const fullExp = quiz.expOfQuiz || 0

		let earnedExp = 0
		if (percent === 100) earnedExp = fullExp
		else if (percent >= 50) earnedExp = Math.floor(fullExp * 0.5)
		else earnedExp = -Math.floor(fullExp * 0.5)

		const expField = quiz.category ? `${quiz.category}Exp` : 'vocabularyExp'
		await updateUserCategoryExpByAmount(currentUser.uid, earnedExp, expField)
	}

	useEffect(() => {
		const handleKeyDown = e => {
			if (
				e.key === 'Enter' &&
				selectedAnswers[currentQuestionIndex] !== undefined &&
				!submitted
			) {
				handleNext()
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [currentQuestionIndex, selectedAnswers, submitted])

	if (isLoading) return <QuizPageSkeleton />
	if (!quiz) return <p>Quiz not found.</p>

	const currentQuestion = quiz.questions[currentQuestionIndex]
	const totalQuestions = quiz.questions.length
	const progressPercent = Math.floor(
		(currentQuestionIndex / totalQuestions) * 100
	)

	return (
		<div className='quiz-page'>
			<div className='quiz-header'>
				<button className='home-btn' onClick={() => navigate('/vocabulary')}>
					<FaArrowLeft />
				</button>
				<div className='quiz-title-wrapper'>
					<h2 className='quiz-title'>{quiz.name}</h2>
				</div>
			</div>

			<div className='progress-bar'>
				<div
					className='progress-fill'
					style={{ width: `${submitted ? 100 : progressPercent}%` }}
				></div>
			</div>

			<div className='quiz-content'>
				{!submitted ? (
					<>
						<p className='question-count'>
							Question {currentQuestionIndex + 1} of {totalQuestions}
						</p>
						<p className='question-text'>{currentQuestion.questionText}</p>

						<div className='quiz-options'>
							{currentQuestion.options.map((opt, j) => {
								const isSelected = selectedAnswers[currentQuestionIndex] === j
								return (
									<button
										key={j}
										className={`option-btn ${isSelected ? 'selected' : ''}`}
										onClick={() => handleSelect(j)}
									>
										{opt}
									</button>
								)
							})}
						</div>

						<button className='submit-btn' onClick={handleNext}>
							{currentQuestionIndex === totalQuestions - 1
								? 'Submit Quiz'
								: 'Next →'}
						</button>
					</>
				) : (
					<div className='result-card'>
						<h2 className='result-title'>🎉 Quiz Completed!</h2>
						<p className='result-score'>
							✅ You got <strong>{score}</strong> out of{' '}
							<strong>{quiz.questions.length}</strong> correct.
						</p>
						<p className='result-exp'>
							{(score / quiz.questions.length) * 100 === 100
								? `🏆 Full EXP earned: ${quiz.expOfQuiz}`
								: (score / quiz.questions.length) * 100 >= 50
								? `💡 Half EXP earned: ${Math.floor(quiz.expOfQuiz / 2)}`
								: `⚠️ 50% of EXP lost: -${Math.floor(quiz.expOfQuiz / 2)}`}
						</p>

						<button
							className='return-btn'
							onClick={() => navigate('/vocabulary')}
						>
							← Back to Quizzes
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

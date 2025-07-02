import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { updateUserExpByAmount } from '../../firebase/exp'
import { useGetQuizByIdQuery } from '../../store/api/quiz-api/quiz.api'
import './QuizPage.css'

export default function QuizPage() {
	const { id } = useParams()
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
			if (selectedAnswers[i] === q.correctAnswer) {
				correct++
			}
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

		await updateUserExpByAmount(currentUser.uid, earnedExp)
	}

	// ⌨️ ENTER KEY SUPPORT
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

	if (isLoading) return <div className='loader'></div>
	if (!quiz) return <p>Quiz not found.</p>

	const currentQuestion = quiz.questions[currentQuestionIndex]
	const totalQuestions = quiz.questions.length
	const progressPercent = Math.floor(
		(currentQuestionIndex / totalQuestions) * 100
	)

	return (
		<div className='quiz-bg'>
			<div className='quiz-container'>
				<div className='progress-bar'>
					<div
						className='progress-fill'
						style={{ width: `${submitted ? 100 : progressPercent}%` }}
					></div>
				</div>

				<h2>{quiz.name}</h2>
				<p className='quiz-page-desc'>{quiz.description}</p>

				{!submitted && (
					<div className='quiz-question'>
						<p>
							Question {currentQuestionIndex + 1} of {totalQuestions}
						</p>
						<p>{currentQuestion.questionText}</p>
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
						<button
							className='submit-btn'
							onClick={handleNext}
							disabled={selectedAnswers[currentQuestionIndex] === undefined}
						>
							{currentQuestionIndex === totalQuestions - 1
								? 'Submit Quiz'
								: 'Next →'}
						</button>
					</div>
				)}

				{submitted && (
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
					</div>
				)}
			</div>
		</div>
	)
}

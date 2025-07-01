import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase/firebase'
import './QuizPage.css'

export default function QuizPage() {
	const { id } = useParams()
	const { currentUser } = useAuth()
	const [quiz, setQuiz] = useState(null)
	const [loading, setLoading] = useState(true)
	const [selectedAnswers, setSelectedAnswers] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const [score, setScore] = useState(0)

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				const res = await fetch(
					`https://road-to-success-backend.onrender.com/get-quiz/${id}`
				)
				const data = await res.json()
				setQuiz(data.innerData)
			} catch (err) {
				console.error('Failed to fetch quiz:', err)
			} finally {
				setLoading(false)
			}
		}
		fetchQuiz()
	}, [id])

	const handleSelect = (qIndex, option) => {
		if (!submitted) {
			setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }))
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

		if (percent === 100) {
			earnedExp = fullExp
		} else if (percent >= 50) {
			earnedExp = Math.floor(fullExp * 0.5)
		} else {
			earnedExp = -Math.floor(fullExp * 0.5)
		}

		const userRef = doc(db, 'users', currentUser.uid)
		const snap = await getDoc(userRef)

		if (snap.exists()) {
			const userData = snap.data()
			const currentExp = userData.exp || 0
			const updatedExp = Math.max(currentExp + earnedExp, 0) // never go negative

			await updateDoc(userRef, { exp: updatedExp })
		}
	}

	if (loading) return <div className='loader'></div>
	if (!quiz) return <p>Quiz not found.</p>

	return (
		<div className='quiz-container'>
			<h2>{quiz.name}</h2>
			<p className='quiz-desc'>{quiz.description}</p>

			<ol className='quiz-questions'>
				{quiz.questions.map((q, i) => (
					<li key={i} className='quiz-question'>
						<p>{q.questionText}</p>
						<div className='quiz-options'>
							{q.options.map((opt, j) => {
								const isSelected = selectedAnswers[i] === j
								const isCorrect = submitted && j === q.correctAnswer
								const isWrong = submitted && isSelected && j !== q.correctAnswer

								return (
									<button
										key={j}
										className={`option-btn ${
											isCorrect
												? 'correct'
												: isWrong
												? 'wrong'
												: isSelected
												? 'selected'
												: ''
										}`}
										onClick={() => handleSelect(i, j)}
										disabled={submitted}
									>
										{opt}
									</button>
								)
							})}
						</div>
					</li>
				))}
			</ol>

			{!submitted ? (
				<button className='submit-btn' onClick={handleSubmit}>
					Submit Quiz
				</button>
			) : (
				<div className='result'>
					<p>
						✅ You got {score} out of {quiz.questions.length} correct.
					</p>
					<p>
						{(score / quiz.questions.length) * 100 === 100
							? `🎉 Full EXP earned: ${quiz.expOfQuiz}`
							: (score / quiz.questions.length) * 100 >= 50
							? `💡 Half EXP earned: ${Math.floor(quiz.expOfQuiz / 2)}`
							: `⚠️ 50% of EXP lost: -${Math.floor(quiz.expOfQuiz / 2)}`}
					</p>
				</div>
			)}
		</div>
	)
}

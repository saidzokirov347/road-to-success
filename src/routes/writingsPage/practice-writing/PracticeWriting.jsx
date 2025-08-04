import { Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetWritingTaskByIdQuery } from '../../../store/api/writing-api/writing.api'
import './PracticeWriting.css'

export function PracticeWriting() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, error, isLoading } = useGetWritingTaskByIdQuery(id)
	const [answer, setAnswer] = useState('')
	const [seconds, setSeconds] = useState(20 * 60)

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(prev => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	if (isLoading)
		return <div className='practise-writing-container'>Loading...</div>
	if (error || !data)
		return (
			<div className='practise-writing-container'>Failed to load task.</div>
		)

	const wordLimit = data.type === 'task-2' ? 250 : 150
	const wordCount = answer.trim().split(/\s+/).filter(Boolean).length
	const minutes = Math.floor(seconds / 60)
	const secs = String(seconds % 60).padStart(2, '0')

	return (
		<div className='practise-writing-wrapper'>
			<div className='practise-writing-navbar'>
				<button
					className='practise-writing-back-button'
					onClick={() => navigate(-1)}
				>
					← Go Back
				</button>
				<div className='practise-writing-timer'>
					Time Left: {minutes}:{secs}
				</div>
			</div>

			<div className='practise-writing-container practise-writing-page'>
				<div className='practise-writing-left'>
					<div className='practise-writing-left-scroll'>
						<p className='practise-writing-question'>{data.question}</p>
						{data.type === 'task-1' && (
							<img
								src={data.imageUrl}
								alt='Task visual'
								className='practise-writing-image'
							/>
						)}
					</div>
				</div>
				<div className='practise-writing-right-scroll'>
					<textarea
						className='practise-writing-textarea'
						value={answer}
						onChange={e => setAnswer(e.target.value)}
						placeholder='Write your answer here...'
					/>
					<div className='practise-writing-wordlimit'>
						Words: {wordCount} / {wordLimit}
					</div>
					<button className='practise-writing-submit-button'>
						<span>Submit</span> <Send size={20} />
					</button>
				</div>
			</div>
		</div>
	)
}

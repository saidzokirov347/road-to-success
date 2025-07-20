import { X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddEssayMutation } from '../../store/api/essays-api/essays.api'
import './WriteEssay.css'

export function WriteEssay() {
	const [type, setType] = useState('task1')
	const [question, setQuestion] = useState('')
	const [essay, setEssay] = useState('')
	const [addEssay, { isLoading }] = useAddEssayMutation()
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		if (!question || !essay) return alert('Please fill in all fields')
		try {
			await addEssay({ type, question, essay }).unwrap()
			setType('task1')
			setQuestion('')
			setEssay('')
			alert('Essay submitted successfully')
		} catch (err) {
			console.error(err)
			alert('Failed to submit essay')
		}
	}

	return (
		<>
			<div className='close-btn-wrapper'>
				<button className='close-btn' onClick={() => navigate('/profile')}>
					<X size={24} />
				</button>
			</div>
			<div className='create-essay'>
				<h2 className='create-essay__title'>Write an Essay</h2>
				<form onSubmit={handleSubmit} className='create-essay__form'>
					<label className='create-essay__label'>
						Type:
						<select
							value={type}
							onChange={e => setType(e.target.value)}
							className='create-essay__select'
						>
							<option value='task1'>Task 1</option>
							<option value='task2'>Task 2</option>
						</select>
					</label>

					<label className='create-essay__label'>
						Question:
						<textarea
							value={question}
							onChange={e => setQuestion(e.target.value)}
							placeholder='Enter the essay question...'
							required
							className='create-essay__textarea'
						/>
					</label>

					<label className='create-essay__label'>
						Essay:
						<textarea
							value={essay}
							onChange={e => setEssay(e.target.value)}
							placeholder='Write your essay here...'
							required
							className='create-essay__textarea create-essay__textarea--essay'
						/>
					</label>

					<button
						type='submit'
						disabled={isLoading}
						className='create-essay__button'
					>
						{isLoading ? 'Submitting...' : 'Submit Essay'}
					</button>
				</form>
			</div>
		</>
	)
}

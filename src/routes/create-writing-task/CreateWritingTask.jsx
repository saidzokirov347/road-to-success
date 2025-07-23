import { useState } from 'react'
import { useCreateWritingTaskMutation } from '../../store/api/writing-api/writing.api'
import './CreateWritingTaskForm.css'
export function CreateWritingTaskForm() {
	const [imageUrl, setImageUrl] = useState('')
	const [question, setQuestion] = useState('')
	const [createWritingTask, { isLoading, isSuccess, isError }] =
		useCreateWritingTaskMutation()

	const handleSubmit = async e => {
		e.preventDefault()
		await createWritingTask({ imageUrl, question })
		setImageUrl('')
		setQuestion('')
	}

	return (
		<form onSubmit={handleSubmit} className='create-writing-task-form'>
			<h2>Create Writing Task 1</h2>

			<input
				type='text'
				placeholder='Image URL'
				value={imageUrl}
				onChange={e => setImageUrl(e.target.value)}
				required
			/>

			<textarea
				placeholder='Enter the question...'
				value={question}
				onChange={e => setQuestion(e.target.value)}
				required
			/>

			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Creating...' : 'Create Task'}
			</button>

			{isSuccess && <p className='success'>Task created successfully!</p>}
			{isError && <p className='error'>Something went wrong.</p>}
		</form>
	)
}

import { useState } from 'react'
import './CalendarEditModal.css'

export default function CalendarEditModal({
	dayKey,
	mark,
	onClose,
	onMark,
	handleIELTSChange,
}) {
	const [selectedEmoji, setSelectedEmoji] = useState(mark?.emoji || null)
	const [showIELTSSelect, setShowIELTSSelect] = useState(false)
	const [selectedScore, setSelectedScore] = useState(mark?.ielts || '')

	const handleEmojiClick = emoji => {
		setSelectedEmoji(emoji)
		setShowIELTSSelect(true) // Always show select after any emoji
	}

	const handleSelectChange = e => {
		const score = parseFloat(e.target.value)
		setSelectedScore(score)
		handleIELTSChange(e, dayKey)
		onMark({ emoji: selectedEmoji, ielts: score }, dayKey)
		onClose()
	}

	return (
		<div className='calendar-modal-overlay' onClick={onClose}>
			<div className='calendar-modal' onClick={e => e.stopPropagation()}>
				<h4>Edit Mark for {dayKey}</h4>

				<div style={{ margin: '12px 0' }}>
					<button
						className='mark-btn success'
						onClick={() => handleEmojiClick('✅')}
					>
						✅ Yes
					</button>
					<button
						className='mark-btn fail'
						style={{ marginLeft: '10px' }}
						onClick={() => handleEmojiClick('❌')}
					>
						❌ No
					</button>
				</div>

				{showIELTSSelect && (
					<select
						className='ielts-select'
						value={selectedScore}
						onChange={handleSelectChange}
					>
						<option value='' disabled>
							Select IELTS result
						</option>
						{Array.from({ length: 11 }, (_, i) => (4 + i * 0.5).toFixed(1)).map(
							score => (
								<option key={score} value={score}>
									{score}
								</option>
							)
						)}
					</select>
				)}
			</div>
		</div>
	)
}

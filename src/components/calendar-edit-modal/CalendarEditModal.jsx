import './CalendarEditModal.css'

export default function CalendarEditModal({
	dayKey,
	mark,
	onClose,
	onMark,
	handleIELTSChange,
}) {
	const handleEmojiClick = emoji => {
		onMark({ emoji, ielts: null }, dayKey)
		if (emoji === '✅') {
			// Keep modal open for IELTS selection
		} else {
			onClose()
		}
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

				{mark?.emoji === '✅' && (
					<select
						className='ielts-select'
						defaultValue={mark?.ielts || ''}
						onChange={e => {
							handleIELTSChange(e, dayKey)
							onClose()
						}}
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

export function getDaysInMonth(year, month) {
	const date = new Date(year, month, 1)
	const days = []
	while (date.getMonth() === month) {
		days.push(new Date(date))
		date.setDate(date.getDate() + 1)
	}
	return days
}

export function getCalendarRows(year, month) {
	const days = getDaysInMonth(year, month)
	const firstDay = new Date(year, month, 1).getDay()

	const rows = []
	let row = []

	for (let i = 0; i < firstDay; i++) row.push(null)

	days.forEach(day => {
		row.push(day)
		if (row.length === 7) {
			rows.push(row)
			row = []
		}
	})

	if (row.length) {
		while (row.length < 7) row.push(null)
		rows.push(row)
	}

	return rows
}

export function getTodayKey() {
	return new Date().toLocaleDateString('en-CA')
}

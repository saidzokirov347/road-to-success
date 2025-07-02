import { useLocation } from 'react-router-dom'

export function Footer() {
	const location = useLocation()
	const isQuizPage = location.pathname.startsWith('/quiz/')
	return (
		<>
			{!isQuizPage && (
				<footer className='container footer'>
					&copy; 2025 IELTS Strategy Hub. All rights reserved.
				</footer>
			)}
		</>
	)
}

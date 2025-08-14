import { useLocation } from 'react-router-dom'

export function Footer() {
	const { pathname } = useLocation()
	const isQuizPage =
		pathname.startsWith('/quiz/') || pathname === '/profile/write-essay'
	return (
		<>
			{!isQuizPage && (
				<footer className='container footer'>
					&copy; 2025 The Master Path. All rights reserved. ظ
				</footer>
			)}
		</>
	)
}

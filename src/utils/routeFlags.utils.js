export function shouldHideNavbarOnPage(pathname) {
	return pathname.includes('/quiz/') || pathname === '/profile/write-essay'
}

export function isSidebarHiddenPage(pathname) {
	return (
		pathname === '/profile' ||
		pathname.startsWith('/user/') ||
		pathname.includes('/quizzes/')
	)
}

export const LEVEL_THRESHOLDS = [
	0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
]

export const MAX_LEVEL = 10

export const getDefaultProfileData = currentUser => ({
	bio: '',
	name: currentUser.displayName || '',
	username: '',
	profileImage: currentUser.photoURL || '',
	email: currentUser.email || '',
	exp: 0,
	level: 1,
})

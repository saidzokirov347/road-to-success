import { toast } from 'react-toastify'

export const showToast = {
	successProfileUpdate: () => {
		toast.success(' User profile was updated successfully')
	},

	successAuth: () => {
		toast.success('Signed in/up successfully')
	},

	errorAuth: errorMessage => {
		toast.error(` ${errorMessage || 'An authentication error occurred'}`)
	},

	errorProfileUpdate: () => {
		toast.warning('User profile could not be updated')
	},
}

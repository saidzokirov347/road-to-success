import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
	apiKey: 'AIzaSyDGgjwK4c3QvLWMDOR3nEGh8VhrRqKF4nk',
	authDomain: 'chat-app-7383f.firebaseapp.com',
	projectId: 'chat-app-7383f',
	storageBucket: 'chat-app-7383f.firebasestorage.app',
	messagingSenderId: '524616525486',
	appId: '1:524616525486:web:8cad40931a355b0edb2f3f',
	measurementId: 'G-4YSCX2404G',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const messaging = getMessaging(app)

export { app, auth, db, messaging }

const VAPID_KEY =
	'BDMPc1KdETwnY2H-0ltrsVmqrWM3lri1C-5H-bIMBzfiPmQwIxYQZUo3s-8IakFL6uuGrB4SGAvBpSGcx5pwooU'

export const generateToken = async () => {
	try {
		const permission = await Notification.requestPermission()

		if (permission === 'granted') {
			const token = await getToken(messaging, {
				vapidKey: VAPID_KEY,
			})

			if (token) {
				console.log('FCM Token:', token)
			} else {
				console.log('No FCM token received.')
			}
		} else {
			console.log('Notification permission denied.')
		}
	} catch (error) {
		console.error('Error getting FCM token:', error)
	}
}

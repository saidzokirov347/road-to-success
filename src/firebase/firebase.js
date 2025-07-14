import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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

export { app, auth, db }

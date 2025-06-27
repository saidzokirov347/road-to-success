import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCRlYtyVdj0-fJmLOL3s3Qz344vcHUUCWU',
	authDomain: 'road-to-success-9da39.firebaseapp.com',
	projectId: 'road-to-success-9da39',
	storageBucket: 'road-to-success-9da39.firebasestorage.app',
	messagingSenderId: '442322798791',
	appId: '1:442322798791:web:235f07fc120da7a5f2d6e2',
	measurementId: 'G-5S38BVBMR5',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }

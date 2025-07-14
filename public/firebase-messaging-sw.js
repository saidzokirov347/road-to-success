importScripts(
	'https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js'
)
importScripts(
	'https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js'
)

firebase.initializeApp({
	apiKey: 'AIzaSyDGgjwK4c3QvLWMDOR3nEGh8VhrRqKF4nk',
	authDomain: 'chat-app-7383f.firebaseapp.com',
	projectId: 'chat-app-7383f',
	storageBucket: 'chat-app-7383f.firebasestorage.app',
	messagingSenderId: '524616525486',
	appId: '1:524616525486:web:8cad40931a355b0edb2f3f',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
	console.log(
		'[firebase-messaging-sw.js] Received background message ',
		payload
	)

	const notificationTitle = payload.notification.title
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo192.png',
	}

	self.registration.showNotification(notificationTitle, notificationOptions)
})

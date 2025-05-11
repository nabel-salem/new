// Import the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDfIBS2gB4lkRZ1_ZerLk451EVfafrfWSM",
  authDomain: "qtratamal.firebaseapp.com",
  projectId: "qtratamal",
  storageBucket: "qtratamal.appspot.com",
  messagingSenderId: "491056452067",
  appId: "1:491056452067:web:0c8ef019a651cd47c290d6"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification?.title || 'طلب تبرع طارئ';
  const notificationOptions = {
    body: payload.notification?.body || 'هناك حالة طارئة تحتاج إلى تبرع بالدم',
    icon: '/icons/icon-192x192.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: "window"
    }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
import admin from 'firebase-admin'

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://feedmefast-c708d.firebaseio.com'
  });
}

export default admin.firestore()
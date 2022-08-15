import admin from 'firebase-admin'

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
          : undefined,
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://feedmefast-c708d.firebaseio.com'
  });
}

const auth = admin.auth()
const db = admin.firestore()

export { auth, db }
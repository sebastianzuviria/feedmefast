import { getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { doc, setDoc } from "firebase/firestore"

export const db = getFirestore(app)

export const createUser = async (uid, data) => {
    try {
        const userRef = doc(db, "users", uid)
        const user = await setDoc(userRef, data, { merge: true });
        return user
    } catch (error) {
        console.log(error)
    }
}
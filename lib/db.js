import { getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { 
    doc, 
    setDoc,
    collection,
    addDoc,
    deleteDoc
} from "firebase/firestore"

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

export const createSite = async (newSite) => {
    try {
        const siteRef = collection(db, "sites")
        const site = await addDoc(siteRef, newSite);
        return site
    } catch (error) {
        console.log(error)
    }
}

export const createFeedback = async (newFeedback) => {
    try {
        const feedbackRef = collection(db, "feedback")
        const feedback = await addDoc(feedbackRef, newFeedback);
        return feedback
    } catch (error) {
        console.log(error)
    }
}

export const deleteFeedback = async (feedbackId) => {
    try {
        const feedbackRef = doc(db, "feedback", feedbackId)
        await deleteDoc(feedbackRef);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
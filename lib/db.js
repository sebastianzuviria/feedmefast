import { getFirestore } from 'firebase/firestore'
import { app } from './firebase'
import { 
    doc, 
    setDoc,
    collection,
    addDoc
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

export const createSite = (newSite) => {
    return new Promise(async (resolve, reject) => {
        try {
            const siteRef = collection(db, "sites")
            const site = await addDoc(siteRef, newSite);
            return resolve(site)
        } catch (error) {
            reject(error)
        }
    })
}
import { getFirestore } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebase'
import { 
    doc, 
    setDoc,
    collection,
    addDoc,
    deleteDoc,
    onSnapshot,
    updateDoc
} from "firebase/firestore"
import getStripe from '@/lib/stripe'

export const db = getFirestore(app)
export const functions = getFunctions(app, 'us-central1')

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
        return error
    }
}

export const updateFeedback = async (feedbackId, newStatus) => {
    try {
        const feedbackRef = doc(db, "feedback", feedbackId)
        const updatedFeedback = await updateDoc(feedbackRef, newStatus);
        return updatedFeedback
    } catch (error) {
        return error
    }
}

export const createCheckoutSession = async (uid) => {
    try {
        const checkoutSessionData = {
            price: 'price_1M8tieK6AK0zF1NLhuamgiWE',
            success_url: window.location.origin,
            cancel_url: window.location.origin
        }
        const userCheckoutSessionRef = collection(db, "users", uid, "checkout_sessions")
        const checkoutSessionRef = await addDoc(userCheckoutSessionRef, checkoutSessionData);

        onSnapshot(checkoutSessionRef, async (snap) => {
            const { sessionId } = snap.data()
            if(sessionId) {
                const stripe = await getStripe()
                stripe.redirectToCheckout({ sessionId })
                return true
            } else {
                return false
            }
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

export const goToBillingPortal = async () => {
    try {
        const createPortalLinkRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink')
        const { data } = await createPortalLinkRef({ returnUrl: `${window.location.origin}/account` })
        window.location.assign(data.url)
    } catch (error) {
        console.log(error)
    }
}
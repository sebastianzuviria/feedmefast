import { compareDesc, parseISO } from 'date-fns'
import { db } from './firebase-admin'

export const getAllFeedback = async (siteId) => {
    try {
        const QuerySnapshot = await db
        .collection('feedback')
        .where('siteId', '==', siteId)
        .get()

        const feedback = QuerySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}
            })

        feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

        return { feedback } 
        
    } catch (error) {
        return { error }
    }
}

export const getSite = async (siteId) => {
    try {
        const doc = await db
        .collection('sites')
        .doc(siteId)
        .get()

       const site = { id: doc.id, ...doc.data() }

        return { site }

    } catch (error) {
        return { error }
    }
}

export const getAllSites = async () => {
    try {
        const QuerySnapshot = await db
        .collection('sites')
        .get()

        const sites = QuerySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}
            })

        return { sites }

    } catch (error) {
        return { error }
    }
}

export const getUserSites = async (userId) => {
    const QuerySnapshot = await db
    .collection('sites')
    .where('authorId', '==', userId)
    .get()

    const sites = QuerySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}
        })

    return { sites }
}

export const getUserFeedback = async (userId) => {
    const QuerySnapshot = await db
    .collection('feedback')
    .where('authorId', '==', userId)
    .get()

    const feedback = QuerySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}
        })

    return { feedback }
}
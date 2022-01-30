import { compareDesc, parseISO } from 'date-fns'
import admin from './firebase-admin'
 
export const getAllFeedback = async (siteId) => {
    try{
        const QuerySnapshot = await admin
        .collection('feedback')
        .where('siteId', '==', siteId)
        .get()
        
        const feedback = QuerySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}
        })

        feedback.sort((a, b) => 
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        )

        return { feedback }
    } catch (error) {
        return { error }
    }
}

export const getAllSites = async () => {
    try {
        const QuerySnapshot = await admin
        .collection('sites')
        .get()
        
        const sites = QuerySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate()}
        })

        return { sites }
    } catch (error) {
        return { error }
    }
}

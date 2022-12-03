import { compareDesc, parseISO } from 'date-fns'
import { db } from './firebase-admin'

export const getAllFeedback = async (siteId, route) => {
    try {
        let ref = db
        .collection('feedback')
        .where('siteId', '==', siteId)
        .where('status', '==', 'active')

        if(route) {
            ref = ref.where('route', '==', route)
        }

        const QuerySnapshot = await ref.get()

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
    const status = ['active', 'pending']

    const QuerySnapshot = await db
    .collection('feedback')
    .where('authorId', '==', userId)
    .where('status', 'in', status)
    .get()

    const feedback = QuerySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate().toISOString()}
        })

    return { feedback }
}

export const getAllFeedbackForSites = async(uid) => {
    const { sites } = await getUserSites(uid);
    
    if (!sites.length) {
        return { feedback: [] };
    }
    
    const siteIds = sites.map((site) => site.id);
    const snapshot = await db
      .collection('feedback')
      .where('siteId', 'in', siteIds)
      .get();
  
    const feedback = [];
  
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });
  
    return { feedback };
  }
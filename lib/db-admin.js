import firebase from './firebase-admin'

export const getAllFeedback = async (siteId) => {
    const QuerySnapshot = await firebase
        .collection('feedback')
        .where('siteId', '==', siteId)
        .get()

    const feedback = QuerySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate()}
        })

    return feedback 
}

import db from '@/lib/firebase-admin'

export default async function (_, res) {
  try {
    const sitesRef = db.collection('sites')
    const QuerySnapshot = await sitesRef.get()
  
    const sites = QuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate()}
    })
    res.status(200).json({sites})
    
  } catch (error) {
    console.log(error)
  }

}

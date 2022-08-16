export default async function (req, res) {
    try {
        const planId = req.query.planId
        console.log(planId)
        const response = await fetch(`https://api.mercadopago.com/preapproval_plan/${planId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }),
            credentials: 'cross-origin'
        })
  
        const data = await response.json()
        console.log(data)
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error })
    }
}
export default async function (req, res) {
  try {
    const response = await fetch('https://api.mercadopago.com/preapproval_plan/search', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        }),
        credentials: 'cross-origin'
    })

    const { results } = await response.json()

    res.status(200).json({ plans: results})
  } catch (error) {
     res.status(500).json({ error })
  }
}
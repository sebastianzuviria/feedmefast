export default async function (req, res) {
    try {
      res.status(200).json()
    } catch (error) {
       res.status(500).json({ error })
    }
}
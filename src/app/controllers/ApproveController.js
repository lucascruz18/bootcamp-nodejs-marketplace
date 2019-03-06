const Purchase = require('../models/Purchase')

class ApproveController {
  async stote (req, res) {
    const { id } = req.params

    const { ad } = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userID)) {
      return res.status(401).json({ error: "You're not the ad author" })
    }

    if (ad.PurchaseBy) {
      return res
        .status(400)
        .json({ error: 'This ad had already been purchased' })
    }

    ad.PurchaseBy = id

    await ad.save()

    return res.json(ad)
  }
}

module.exports = new ApproveController()

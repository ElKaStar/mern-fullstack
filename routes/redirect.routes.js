const {Router} = require('express')
const Link = require('./../models/Link')
const router = Router()


router.get('/:code', async (req, res) => {

    try {
        const redirectLink = await Link.findOne({code: req.params.code})

        if (redirectLink) {
            redirectLink.clicks ++
            await redirectLink.save()
            return res.redirect(redirectLink.from)

        }
        res.status(404).json({message: "Link is not founded"})

    } catch (e) {
        res.status(500).json({message: 'Smth went wrong with link'})
    }
})


module.exports = router
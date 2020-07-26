const {Router} = require('express')
const Link = require('./../models/Link')
const router = Router()
const shortId = require('shortid')
const auth = require('./../middleware/auth.middleware')
const config = require('config')


router.post('/generate', auth, async (req, res) => {
    try {
        console.log('userID', req.user.userID)
        const baseUrl = config.get('baseUrl')
        console.log('baseUrl', baseUrl)
        const {from} = req.body
        console.log('from', req.body)
        const code = shortId.generate()
        console.log('code', code)

        const existingLink = await Link.findOne({from})

        console.log('existingLink', existingLink)
        if (existingLink) {
            return res.json({link: existingLink})
        }
        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, from, to, owner: req.user.userID
        })
        await link.save()
        res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: 'Smth went wrong in generate'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userID})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Smth went wrong'})
    }
})

router.get('/:id', auth, async (req, res) => {
    console.log("ID",req.params.id )
    try {
        const linkDetails = await Link.findById(req.params.id)
        res.json(linkDetails)

    } catch (e) {
        res.status(500).json({message: 'Smth went wrong with link'})
    }
})


module.exports = router
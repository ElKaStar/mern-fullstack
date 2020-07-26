const {Router} = require('express')
const Notes = require('./../models/Notes')
const router = Router()
const auth = require('./../middleware/auth.middleware')
const config = require('config')


router.post('/new', auth, async (req, res) => {
    try {
        const {note, date, owner} = req.body
        const notes = new Notes({note, date, owner})
        await notes.save()
        res.status(201).json({message: 'Note was added'})

    } catch (e) {
        res.status(500).json({message: 'Smth went wrong'})
    }
})

router.get('/', auth, async (req, res) => {

    try {
        const notesDet = await Notes.find({ owner: req.user.userID})
        res.json(notesDet)
    } catch (e) {
        res.status(500).json({message: 'Smth went wrong'})
    }
})



module.exports = router
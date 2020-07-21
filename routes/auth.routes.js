const {Router} = require('express')
const User = require('./../models/User')
const bcrypt = require('bcryptjs')
const router = Router()

router.post('./register', async (req, res) => {
try {
    const {email, password} = req.body
    const candidate = await User.findOne({email})
    if (candidate) {
        return res.status(400).json({message:'This email is already existed'})
    }
    const hashPassword = await bcrypt.hash(password, 12)

} catch (e) {
    res.status(500).json({message: 'Smth went wrong'})
}
} )
router.post('./login', async (req, res) => {

} )

module.exports = router
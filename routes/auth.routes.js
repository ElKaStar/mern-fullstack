const {Router} = require('express')
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const router = Router()
const config = require('config')


router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min letters should be 6').isLength({min: 6})
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data registration'
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'This email is already existed'})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: 'User was created successfully'})

        } catch (e) {
            res.status(500).json({message: 'Smth went wrong'})
        }
    })
router.post(
    '/login',
    [
        check('email', 'Please enter correct email').normalizeEmail().isEmail(),
        check('password', 'Min letters should be 6').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong data during log in'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({ message: 'This email is not exist'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Password is not correct'
                })
            }
            const token = jwt.sign(
                {userID: user.id},
                config.get('jwtSecretKey'),
                {expiresIn: '1h'}
            )
            res.json({
                token,
                userId: user.id
            })

        } catch (e) {
            res.status(500).json({message: 'Smth went wrong'})
        }
    })
router.get(
    '/test',
    async (req, res) => {
        try {
            res.status(200).json({message: 'Test went successfully'})

        } catch (e) {
            res.status(500).json({message: 'Test went wrong'})
        }
    })

module.exports = router
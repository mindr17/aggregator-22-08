const { Router } = require('express');
const router = Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

router.post(
    '/register',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 chars long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
            .matches(/\D/)
            .withMessage('Password must contain a char')
    ],
    async (req, res) => {
        try {
            console.log('body:', req.body);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.array()[0].msg
                })
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'Such email already exists!' });
            }

            const hashedPass = await bcrypt.hash(password, saltRounds);
            const user = new User({ email, password: hashedPass });

            // console.log('hashedPass:', hashedPass);           

            await user.save();

            res.status(201).json({ message: 'User successfully created!' });
        } catch (err) {
            // console.log('err', err);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    });

router.post(
    '/login',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password', 'Enter correct password').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid user's data"
                })
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User doesn\'t exist' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecretKey'),
                { expiresIn: '24h' }
            );

            res.status(200).json({ token, userId: user.id, message: 'Welcome!' });

        } catch (err) {
            console.log('err', err);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    });

module.exports = router;
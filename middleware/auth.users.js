const { JWT_SECRET_KEY } = require('../config/config')
const jwt = require('jsonwebtoken')


exports.userIsSignedIn = async (req, res, next) => {
    try {
        let user;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            if (!decoded) {
                return res.status(401).json({ message: 'Invalid Token' })
            }
            req.user = {}
            req.user = decoded.data
            next()
        } else {
            return res.status(401).json({ message: 'Unauthorized to access this Route kkk' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized to access this Route' })
    }
}
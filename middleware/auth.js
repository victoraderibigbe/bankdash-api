const { JWT_SECRET_KEY, ACCESS_SECRET, HASH_KEY, X_API_KEY } = require('../config/config')
const jwt = require('jsonwebtoken')
const db = require('../model')
const Admin = db.Admin
const worker = db.worker
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const apiKey = db.Apikey

exports.isSignedIn = async (req, res, next) => {
    try {
        let user;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            if (!decoded) {
                return res.status(401).json({ message: 'Invalid Token' })
            }

            const userType = decoded.userType

            if (userType === 'admin') {
                user = await Admin.findByPk(decoded.userId)
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized to access this Route' })
                }
            }
            else if (userType === 'worker') {
                user = await worker.findByPk(decoded.userId)
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized to access this Route' })
                }

            }
            else {
                return res.status(401).json({ message: 'Unauthorized to access this Route' })
            }

            req.user = {}
            req.user.id = decoded.userId
            req.user.type = decoded.userType
            decoded.workerType ? req.user.workerType = decoded.workerType : null

            next()
        } else {
            return res.status(401).json({ message: 'Unauthorized to access this Route' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized to access this Route' })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.type === 'admin') {
            next()
        } else {
            return res.status(401).json({ message: 'Unauthorized to access this Route' })
        }
    } catch (error) {

    }
}

exports.Allowworkers = (req, res, next) => {
    try {
        if (req.user.type === 'customers_care' || req.user.type === 'hr' ||   req.user.type === "database_admin") {
            next()
        } else {
            return res.status(401).json({ message: 'Unauthorized to access this Route' })
        }
    } catch (error) {

    }
}

exports.verify_X_API_KEY = async (req, res, next) =>{
    try {
        const x_api_key = req.headers['x-api-key'];
        if(!x_api_key || x_api_key !== X_API_KEY ){
            const error = new AppError("Forbibben", 403)
            return res.status(error.statusCode).json(error.toJSON());
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized to access this Route' })
    }
}
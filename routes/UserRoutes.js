const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')

router.post('/user', (req, res) => {
	const user = new User({
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	userName: req.body.userName,
	password: req.body.password,
	email: req.body.email
    })


bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    user.save()
    .then(data => console.log('Successfully created a new user'))
    .catch(error => console.error(error))
    })
})



module.exports = router;
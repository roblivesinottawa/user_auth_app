const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const ejs = require('ejs')
const { response } = require('express')
const passport = require('passport')

// app.set('view engine', 'ejs')


router.post('/user', (req, res) => {
	const user = new User({
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	userName: req.body.userName,
	password: req.body.password,
	email: req.body.email
    })

router.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/signup.html')))

router.get('/users', (req, res) => {
    User.find({} , (error, result) => result ? response.render('availableUsers', {'users': result}) : res.status(404))
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
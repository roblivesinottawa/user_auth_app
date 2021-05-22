const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/UserRoutes')
const port = require('./index')
const ejs = require('ejs')
const passport = require('passport')
const User = require('./model/User')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const { v4: uuidv4 } = require('uuid');

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', usersRoute)
app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())


// serving static files
// app.use('/images', express_static(__dirname + '/images'))
// app.use('/css', express_static(__dirname + '/css'))
// app.use('/fonts', express_static(__dirname + '/fonts'))

const MONGO_URI = "mongodb+srv://dbUser:1029384756@cluster1.gskfs.mongodb.net/UserAuthDB?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI, 
	{useNewUrlParser: true, 
	useUnifiedTopology: true}, 
	() => console.log('Connected to MongoDB successfully!!'))

app.get('/', (req, res) => res.send('this is a test'))

passport.use(new LocalStrategy(
	{usernameField: 'userName'},
	(userName, password, done) => {
		User.findOne({userName}, (err, userData) => {
			let passwordCheck = bcrypt.compareSync(password,
				userData.password)
				if (userName === userData.userName && passwordCheck){
					return done(null, userData)
				}
		})
	}
))
app.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		req.login(user, (err) => {
			res.redirect('/index')
		})
	})(req, res, next)
})

app.use(session({
	genid: (req) => {
	return uuid() // use UUIDs for session IDs
	},
	store: new FileStore(),
	secret: 'anything is okay',
	resave: false,
	saveUninitialized: true
 }))
 passport.serializeUser((user, done) => {
	 done(null, user.id);
 });
 passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user) { 
	 loggedInUser = user;
	 done(err, user);
 });
 });


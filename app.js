const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/UserRoutes')

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', usersRoute)

const MONGO_URI = "mongodb+srv://dbUser:1029384756@cluster1.gskfs.mongodb.net/UserAuthDB?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI, 
	{useNewUrlParser: true, 
	useUnifiedTopology: true}, 
	() => console.log('Connected to MongoDB successfully!!'))

app.get('/', (req, res) => res.send('this is a test'))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server is listening at localhost:${port}`))



const express = require("express")
const app = express()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is listening at localhost:${port}`))

module.exports = port
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
const db = require('./config/db')
require('dotenv').config()
db()

app.use(express.json())
app.use(cookieParser())

app.use('/images', express.static('./uploads'))
app.use('/user', require('./routes/userRoutes'))

app.use('/festivals', require('./routes/festivalRoutes'))
app.use('/bands', require('./routes/bandsRoutes'))
app.use('/band-attendance', require('./routes/bandAttendanceRoutes'))
const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server is up and running at port', port))
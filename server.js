if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const indexRouter= require('./routes/index')
const loginRouter= require('./routes/login')
const registerRouter = require('./routes/register')
const surveyRouter = require('./routes/survey')
const manageReportsRouter = require('./routes/managereports')
const dashboardRouter = require('./routes/dashboard')

// mongodb stuff--------------------------------------------------------------------
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongo DB'))
//------------------------------------------------------------------------------------

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false}))
app.use(express.static(__dirname));
app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/survey', surveyRouter)
app.use('/manageReports', manageReportsRouter)
app.use('/dashboard',dashboardRouter)

// syntax to limit how much data is being pushed to mongo db
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.listen(process.env.PORT || 3000)
//auto
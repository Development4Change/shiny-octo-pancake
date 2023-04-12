if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const indexRouter= require('./routes/index')
const loginRouter= require('./routes/login')
const registerRouter = require('./routes/register')
const surveyRouter = require('./routes/survey')
const manageReportsRouter = require('./routes/manageReports')
const dashboardRouter = require('./routes/dashboard')
const oneDay = 1000 * 60 * 60 * 24 
//const { authUser, authRole } = require('./basicAuth')
const opportunityRouter = require('./routes/opportunityRouter')
const postedOpportunitiesRouter = require('./routes/postedOpportunities')


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
app.use(express.json())
app.use(express.static(__dirname))
app.use(cookieParser())
app.use(sessions({
    secret: "843754540762b7f3cd88ec11b76e08dcde8c2e002fa72ee3431261897898102d8f7bd8f19778ad0ceac8e64b2e08108c4eaccca8ea9552b5f0c560e9377edecb",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false }));

app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/survey', surveyRouter)
app.use('/manageReports', manageReportsRouter)
app.use('/dashboard',dashboardRouter)
app.use('/', opportunityRouter)
app.use('/', postedOpportunitiesRouter)


// syntax to limit how much data is being pushed to mongo db
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.listen(process.env.PORT || 3000)
//auto




























//Trashbin

//rest post
/*###
POST http://localhost:3000/login
Content-Type: application/json

{
    "email":"yourmom@yourmom.com",
    "password":"yourmomyourmom"
}*/

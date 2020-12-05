if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//set up
const express = require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Connect to mongoose
mongoose.connect(process.env.DATANASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Coonected to mongoDB'))

//set up files
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


//for Routes
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

app.use('/', indexRouter)
app.use('/authors', authorsRouter)



//set up ports
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;

}

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATANASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Coonected to mongoDB'))

const indexRou = require('./routes/index')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


app.use('/', indexRou)









let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;

}

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

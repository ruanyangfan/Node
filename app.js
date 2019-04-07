var express = require('express')
var path = require('path')
var router  = require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(router)

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))

app.listen(3000,function () {
	console.log('running')
})
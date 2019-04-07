var express = require('express')
var User = require('./models/user')


var router = express.Router()

router.get('/',function (req,res) {
	
	res.render('index.html',{
		user:req.session.user
	})
})

router.get('/login',function (req,res) {
	res.render('login.html')
})

router.post('/login',function (req,res) {
	var body = req.body

	User.findOne({
		email:body.email,
		password:body.password
	},function (err,user) {
		if (err) {
			return res.status(500).json({
			err_code: 500,
			message: err.message
			})
		}
		if (! user) {
			return res.status(200).json({
				err_code: 1,
				message: 'email or password is invaild',
				data: body
			})
		}
		req.session.user = user
		res.status(200).json({
			err_code: 0,
			message: 'OK',
		})
	})
})

router.get('/register',function (req,res) {
	res.render('register.html')
})

router.post('/register',function (req,res) {
	var body = req.body
	User.findOne({
		$or: [
			{
				email:body.email
			},
			{
				nickname:body.nickname
			}
		]
	},function (err,data) {
		if (err) {
			return res.status(500).json({
				err_code: 500,
				message: 'Server error'
			})
		}
		if (data) {
			return res.status(200).json({
				err_code: 1,
				message: 'Email or nickname aleady exists'
			})
		}
		new User(body).save(function (err,user) {
			if (err) {
				return res.status(500).json({
				err_code: 500,
				message: 'Server error'
				})
			}
			req.session.user = user
			res.status(200).json({
			err_code: 0,
			message: 'OK'
			})
		})
		
	})
})

router.get('/logout',function (req,res) {
	req.session.user = null
	res.redirect('/login')
})

router.get('/settings/profile',function(req,res){
	res.render('./settings/profile.html',{ user:req.session.user })
})
router.post('/profile',function(req,res){
	const body = req.body
	User.update({email:req.session.user.email},body,function(err){
		if(err){
			return res.status(500).json({
				err_code: 500,
				message: 'Server error'
			})
		}
		res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})
})

router.get('/settings/admin',function(req,res){
	res.render('./settings/admin.html',{user: req.session.user})
})

router.post('/admin',function(req,res){
	var body = req.body
	console.log(body)
	User.update({email:body.email,password:body.password},{password:body.newpassword},function(err,user){
		if(err){
			return res.status(500).json({
				err_code: 500,
				message: 'Server error'
			})
		}
		if(user.n === 0){
			return res.status(200).json({
				err_code: 1,
				message: 'No'
			})
		}
		res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})
})
module.exports = router
var passport = require('passport')
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var config = require('../config/secret.js')

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.send("Welcome!!")
	})

	app.post('/signup', function(req, res) {
		var newUser = new User({
			email: req.body.email,
			password: req.body.password
		})
		User.createUser(newUser, function(err, user) {
			if (err) {
				res.send("error")
			} else {
				res.send("user signed up !!")
			}
		})
	})

	app.post('/login', function(req, res) {
		var email = req.body.email,
			password = req.body.email;
		User.getUserByEmail(email, function(err, user) {
			if (err) throw err;
			if (!user) {
				return res.send("cant find user!!")
			}
			if (user) {}
			// User.compare(password, user.password, function(err, isMatch) {
			// if (err) throw err
			// if (isMatch) {
			var token = jwt.sign({
				data: user
			}, config.secret, {
				expiresIn: 6000000
			})
			res.json({
				token: token,
				user: {
					id: user._id,
					email: user.email
				}


			})

		})



	})
}
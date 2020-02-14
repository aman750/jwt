var mongoose = require('mongoose');
var config = require('../config/secret.js')
// var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  email: { type: String, unique: true, lowercase: true,required:true},
  password: {type:String,required  :true}

  
});

/*  Hash the password before we even save it to the database */
// UserSchema.pre('save', function(next) {
//   var user = this;
//   if (!user.isModified('password')) return next();
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });


var User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id, callback){
	User.findbyId(id,callback)
}

	module.exports.getUserByEmail = function(email, callback){
	User.findOne({email:email},callback)
}
module.exports.createUser= function(username, callback){
	username.save(callback)
}

module.exports.compare= function(password, callback){
	if(password == "shreya80@"){
		callback(null, isMatch) 
	} 		
}	


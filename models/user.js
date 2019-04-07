var mongoose =require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true});

var userSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nickname:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true,
	},
	created_time:{
		type:Date,
		default:Date.now
	},
	last_modifide_time:{
		type:Date,
		default:Date.now
	},
	avatar:{
		type:String,
		default:'/public/img/avatar-default.png',
	},
	sex:{
		type:String
	},
	birth: {
		type:String
	},
	status:{
		type:Number,
		eunm:[0,1,2],
		default:0
	},
	introduce:{
		type: String,
	}
})

module.exports = mongoose.model('User',userSchema)
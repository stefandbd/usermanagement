const mongoose = require('mongoose');

// Users Schema
const usersSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
    	title:{
		type: String,
		required: true
	},
    	info:{
		type: String,
		required: true
	},
    	linkedin_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const User = module.exports = mongoose.model('User', usersSchema);

// Get Jobs
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

// Get Job by ID
module.exports.getUsersById = (id, callback) => {
	User.findById(id, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

// Update User
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
		name: user.name,
		title: user.title,
		info: user.info,
		linkedin_url: user.linkedin_url
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}

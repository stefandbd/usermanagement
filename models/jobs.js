const mongoose = require('mongoose');

// Jobs Schema
const jobsSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Job = module.exports = mongoose.model('Jobs', jobsSchema);

// Get Jobs
module.exports.getJobs = (callback, limit) => {
	Job.find(callback).limit(limit);
}

// Add Job
module.exports.addJob = (job, callback) => {
	Job.create(job, callback);
}

// Update Job
module.exports.updateJob = (id, job, options, callback) => {
	var query = {_id: id};
	var update = {
		title: job.title
	}
	Job.findOneAndUpdate(query, update, options, callback);
}

// Delete Job
module.exports.removeJob = (id, callback) => {
	var query = {_id: id};
	Job.remove(query, callback);
}

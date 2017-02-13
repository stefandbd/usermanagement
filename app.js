const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Job =require('./models/jobs');
User =require('./models/users');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/haufedb');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/users or /api/jobs');
});

app.get('/api/jobs', (req, res) => {
	Job.getJobs((err, jobs) => {
		if(err){
			throw err;
		}
		res.json(jobs);
	});
});

app.get('/api/users', (req, res) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', (req, res) => {
	User.getUsersById(req.params._id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/jobs', (req, res) => {
	var job = req.body;
	Job.addJob(job, (err, job) => {
		if(err){
			throw err;
		}
		res.json(job);
	});
});

app.post('/api/users', (req, res) => {
	var user = req.body;
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/api/jobs/:_id', (req, res) => {
	var id = req.params._id;
	var job = req.body;
	Job.updateJob(id, job, {}, (err, job) => {
		if(err){
			throw err;
		}
		res.json(job);
	});
});

app.put('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	var user = req.body;
	User.updateUser(id, user, {}, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});


app.delete('/api/jobs/:_id', (req, res) => {
	var id = req.params._id;
	Job.removeJob(id, (err, job) => {
		if(err){
			throw err;
		}
		res.json(job);
	});
});


app.delete('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	User.removeUser(id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
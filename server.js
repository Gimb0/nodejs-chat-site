// App
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Data
var Promise = require('bluebird')
var Dao = require('./data_layer/dao')
var RoomRepository = require('./data_layer/room_repository')
var MessageRepository = require('./data_layer/message_repository')

var defaultRoom = { name: 'Default' }

var appDao = new Dao()
var roomRepo = new RoomRepository(appDao)
var messageRepo = new MessageRepository(appDao)

// Initialize database
roomRepo.createTable()
roomRepo.addNewRoom("default")
messageRepo.createTable()



app.get('/messages/:room', (req, res) => {
	console.log("received request for messages in a room")
	console.log(req.params.room)
	messageRepo.getMessagesByRoom(req.params.room)
	.then(data => {
		console.log(data)
		res.send(data)
	})
	.catch(error => {
		console.log(error)
	})
	
})

app.post('/messages/:room', (req, res) => {
	var room = req.params.room
	if(!roomRepo.doesRoomExist(room)) {
		res.sendStatus(400)
	}

	var user = req.body.user
	var message = req.body.message

	messageRepo.addNewMessage(user, message, new Date(), room)
})

io.on('connection', (socket) => {
	console.log('A user has connected')
})

var server = http.listen(3000, () => {
	console.log('Server is listening on port', server.address().port)
})	
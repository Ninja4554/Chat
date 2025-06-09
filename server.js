const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('user connected');

  socket.on('chat message', data => {
    io.emit('chat message', data);
  });

  socket.on('typing', isTyping => {
    socket.broadcast.emit('typing', isTyping);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});

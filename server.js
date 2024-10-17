# Backend: Express with WebSocket and Redis
// server.js
const express = require('express');
 const http = require('http');
 const { Server } = require('socket.io');
 const Redis = require('ioredis');
 const app = express();
 const server = http.createServer(app);
 const io = new Server(server);
 const redis = new Redis();
 io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('draw', (data) => {
    redis.publish('draw', JSON.stringify(data));
  });
  redis.subscribe('draw', (err, count) => {
    if (err) {
      console.error('Failed to subscribe:', err.message);
    }
  });
  redis.on('message', (channel, message) => {
    io.emit('draw', JSON.parse(message));
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
 });
 const PORT = process.env.PORT || 3000;
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

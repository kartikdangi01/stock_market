const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server, {
  cors: {
    origin: "https://stock-market-hazel.vercel.app"
  }
});
app.use(cors());

app.use(express.json());

let history = {};

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

io.on("connection", (socket) => {

  socket.on("join-room", (room) => {
    if(!history[room])  history[room] = [];
    socket.join(room);
  });

  socket.on("fetch-history", (room) => {
    io.to(room).emit("init", history[room]);
  })
  socket.on("send data", (data) => {
    history[data.name].push(data);
    io.to(data.name).emit("update", data);
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

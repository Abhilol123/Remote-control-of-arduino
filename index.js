let servoAngle = 90;
let servo;

// Server Control
const express = require("express");
const app = express();
const server = app.listen(3000, () => {
    console.log("listening at 3000");
});
app.use(express.static("public"));

// Arduino Control
const { Board, Servos } = require("johnny-five");
const board = new Board();
board.on("ready", () => {
    servo = new Servos([5, 6]);
    for (let i = 0; i < servo.length; i++) {
        servo[i].to(servoAngle);
    }
});

// Socket Control
const socket = require("socket.io");
const io = socket(server);
io.sockets.on('connection', (socket) => {
    socket.emit("start", socket.id);
    console.log("new connection: " + socket.id);
    socket.on('send_angle', (data) => {
        servoAngle = data.servo;
        console.log(data.servo);
        for (let i = 0; i < servo.length; i++) {
            servo[i].to(servoAngle[i]);
        }
    });
});

// lt --port 3000
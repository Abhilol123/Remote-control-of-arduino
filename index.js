const express = require("express");
const { Board, Servos } = require("johnny-five");
const socket = require("socket.io");

const app = express();

let servoAngle = 90;
let servo;

const server = app.listen(3000, () => {
    console.log("listening at 3000");
});

app.use(express.static("public"));

const board = new Board();
board.on("ready", () => {
    servo = new Servos([5, 6]);
    for (let i = 0; i < servo.length; i++) {
        servo[i].to(servoAngle);
    }
});

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

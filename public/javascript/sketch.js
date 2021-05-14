let socket;
let input = [];
let slider = [];
let labels = [];

let sendData = {
    servo: [],
};

let noOfServos = 2;

function setup() {
    // Servo Controls
    let servoX = 0;
    let servoY = 0;
    let textOff = 40;
    labels.push(createP("Servo Controls"));
    labels[0].position(servoX + 0, servoY + 0);
    for (let i = 0; i < noOfServos; i++) {
        sendData.servo.push(90);

        input.push(createInput("90"));
        input[i].size(25);
        input[i].position(servoX + 210, servoY + textOff + i * 20);

        slider.push(createSlider(0, 180, 90, 10));
        slider[i].size(200);
        slider[i].input(sendAngle);
        slider[i].position(servoX + 0, servoY + textOff + i * 20);
    }

    // socket = io.connect("http://localhost:3000/");
    socket = io.connect("https://foolish-dragonfly-74.loca.lt");
    
    socket.on("start", (data) => {
        console.log(data);
    });
}

function sendAngle() {
    for (let i = 0; i < noOfServos; i++) {
        sendData.servo[i] = parseInt(slider[i].value())
        input[i].value(slider[i].value());
    }
    socket.emit("send_angle", sendData);
}
// lt --port 3000

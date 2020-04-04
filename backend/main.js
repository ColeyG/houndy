const five = require('johnny-five');
const Picam = require('pi-camera');

const timeStamp = (dateObject) => `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;

const videoStamp = (length) => {
  const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const date = new Date();
  let resp = '';
  for (let i = 0; i < length; i++) {
    resp += set.charAt(Math.floor(Math.random() * set.length));
  }
  return `${timeStamp(date)}-${resp}`;
};

const board = new five.Board();
let motion;
let gas;
let cameraOn = false;

const clipRecord = () => {
  const camera = new Picam({
    mode: 'video',
    output: `${__dirname}/clips/${videoStamp(5)}.h264`,
    width: 1920,
    height: 1080,
    timeout: 10000,
    nopreview: true,
  });

  camera.record()
    .then((result) => {
      console.log('Recorded Clip');
      cameraOn = false;
    })
    .catch((error) => {
      console.log(`Clip Error: ${error}`);
    });
};

board.on('ready', () => {
  motion = new five.Motion(7);
  gas = new five.Sensor('A0');

  gas.scaleTo(0, 100).on('change', function () {
    console.log(`Gas: ${this, value}`);
  });

  motion.on('calibrated', () => {
    console.log('calibrated');
  });

  motion.on('motionstart', () => {
    console.log('motionstart');
    if (!cameraOn) {
      cameraOn = true;
      clipRecord();
    }
  });

  motion.on('motionend', () => {
    console.log('motionend');
    if (!cameraOn) {
      cameraOn = true;
      clipRecord();
    }
  });
});

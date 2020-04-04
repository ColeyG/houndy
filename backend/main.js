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

const camera = new Picam({
  mode: 'video',
  output: `${__dirname}/clips/some.h264`,
  width: 1920,
  height: 1080,
  timeout: 10000,
  nopreview: true,
});

const board = new five.Board();
let motion;
let cameraOn = false;

const clipRecord = () => {
  camera.record(`${videoStamp(5)}.h264`)
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

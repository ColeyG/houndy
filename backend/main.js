const five = require('johnny-five');
const Picam = require('pi-camera');

const camera = new Picam({
  mode: 'video',
  output: `${__dirname}/clips/video.h264`,
  width: 1920,
  height: 1080,
  timeout: 10000,
  nopreview: true,
});

const board = new five.Board();
let motion;
let cameraOn = false;

const clipRecord = () => {
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
  });
});

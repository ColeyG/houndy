const five = require('johnny-five');

const board = new five.Board();
let motion;
let motionDetected;

const clipRecord = () => {
  console.log('Recording Clip');
  setTimeout(() => {
    if (motionDetected) {
      clipRecord();
    }
  }, 5000);
};

board.on('ready', () => {
  motion = new five.Motion(7);

  motion.on('calibrated', () => {
    console.log('calibrated');
  });

  motion.on('motionstart', () => {
    console.log('motionstart');
    motionDetected = true;
  });

  motion.on('motionend', () => {
    console.log('motionend');
    motionDetected = false;
  });
});

const five = require('johnny-five');

const board = new five.Board();
let motion;

board.on('ready', () => {
  motion = new five.Motion(7);

  motion.on('calibrated', () => {
    console.log('calibrated');
  });

  motion.on('motionstart', () => {
    console.log('motionstart');
  });

  motion.on('motionend', () => {
    console.log('motionend');
  });
});

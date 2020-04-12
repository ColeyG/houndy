const five = require('johnny-five');
const Picam = require('pi-camera');
const http = require('http');
const FormData = require('form-data');
const fs = require('fs');
const config = require('./config/config.json');

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
let gasRecent = 0;
const gasMinDelta = 5;
let light;
let lightRecent = 0;
const lightMinDelta = 5;
let cameraOn = false;

const checkDelta = (current, last, minDelta) => {
  let delta = current - last;
  if (delta < 0) {
    delta *= -1;
  }
  if (delta > minDelta) {
    return true;
  }
  return false;
};

const clipRecord = () => {
  const clipName = `${__dirname}/clips/${videoStamp(5)}.h264`;
  const camera = new Picam({
    mode: 'video',
    output: clipName,
    width: 1920,
    height: 1080,
    timeout: 10000,
    nopreview: true,
  });

  camera.record()
    .then((result) => {
      console.log(`Recorded Clip: ${clipName}`);
      cameraOn = false;

      const data = new FormData();
      data.append('video_file', fs.createReadStream(clipName));

      http.request({
        hostname: `${config.remote}`,
        port: config.port,
        path: '/clipSave',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'text/plain',
        },
      }, (response) => {
        let str = '';
        response.on('data', (chunk) => {
          str += chunk;
        });

        response.on('end', () => {
          const data = JSON.parse(str);
          console.log(data);
        });
      }).end();
    })
    .catch((error) => {
      console.log(`Clip Error: ${error}`);
      cameraOn = false;
    });
};

// TODO: Write a good wrapper for this:

const serverRequest = (logType, amount) => {
  http.request({
    hostname: `${config.remote}`,
    port: config.port,
    path: `/${logType}/${amount}`,
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
    },
  }, (response) => {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      const data = JSON.parse(str);
      console.log(data);
    });
  }).end();
};

board.on('ready', () => {
  motion = new five.Motion(7);
  gas = new five.Sensor('A0');
  light = new five.Sensor('A1');

  gas.scale(0, 100).on('change', function () {
    if (checkDelta(this.value, gasRecent, gasMinDelta)) {
      gasRecent = this.value;
      if (this.value > 90) {
        // ALERT HERE
      }
      serverRequest('gas', this.value);
    }
  });

  light.scale(0, 100).on('change', function () {
    if (checkDelta(this.value, lightRecent, lightMinDelta)) {
      lightRecent = this.value;
      serverRequest('light', this.value);
    }
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

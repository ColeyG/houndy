const express = require('express');
const Log = require('../models/Log');
const Clip = require('../models/Clip');

const router = express.Router();

router.get('/ping', (req, res, next) => {
  res
    .status(200)
    .contentType('text/plain')
    .end('Pong');
});

// TODO: Save Clips

router.get('/clips/:uid', (req, res, next) => {

});

router.post('/clipSave/:uid', (req, res, next) => {
  const clipName = req.params.uid;
  const time = new Date(); // Make this a timestamp!

  const newClip = new Clip({ time, name: clipName });

  newClip.save((err, resp) => {
    if (err) {
      res
        .status(200)
        .contentType('text/json')
        .end('{"error": "error saving data"}');
    } else {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success": ${JSON.stringify(resp)}}`);
    }
  });

  /*
  * I was trying to get this working to save the video files to a remote but restorted to using the pi's storage
  *
  *                                                                   - Cole Geerts
  */

  // console.log(req);

  // const tempPath = req.body.video_file;
  // const newPath = req.body.video_file;
  // const targetPath = `~/uploads/${newPath}`;

  // fs.rename(tempPath, targetPath, (err) => {
  //   if (err) {
  //     const message = err.toString();
  //     res
  //       .status(200)
  //       .contentType('text/json')
  //       .end(`{"error": "${message}"}`);
  //   } else {
  //     res
  //       .status(200)
  //       .contentType('text/json')
  //       .end('{"success": "Some String"}');
  //   }
  // });
});

router.get('/light/:uid', (req, res, next) => {
  const id = req.params.uid;

  const log = new Log({ logType: 'light', amount: id, time: new Date() });

  log.save((err, resp) => {
    if (err) {
      res
        .status(200)
        .contentType('text/json')
        .end('{"error": "error saving data"}');
    } else {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success": ${JSON.stringify(resp)}}`);
    }
  });
});

router.get('/light/getLast/:uid', (req, res, next) => {
  if (req.params.uid === '0') {
    Log.find({ logType: 'light' }).then((logs) => {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success: "${JSON.stringify(logs)}}`);
    });
  } else {
    Log.find({ logType: 'light' }).limit(parseInt(req.params.uid, 10)).then((logs) => {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success: "${JSON.stringify(logs)}}`);
    });
  }
});

router.get('/gas/:uid', (req, res, next) => {
  const id = req.params.uid;

  const log = new Log({ logType: 'gas', amount: id, time: new Date() });

  log.save((err, resp) => {
    if (err) {
      res
        .status(200)
        .contentType('text/json')
        .end('{"error": "error saving data"}');
    } else {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success": ${JSON.stringify(resp)}}`);
    }
  });
});

router.get('/gas/getLast/:uid', (req, res, next) => {
  if (req.params.uid === '0') {
    Log.find({ logType: 'gas' }).then((logs) => {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success: "${JSON.stringify(logs)}}`);
    });
  } else {
    Log.find({ logType: 'gas' }).limit(parseInt(req.params.uid, 10)).then((logs) => {
      res
        .status(200)
        .contentType('text/json')
        .end(`{"success: "${JSON.stringify(logs)}}`);
    });
  }
});

module.exports = router;

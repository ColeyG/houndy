const express = require('express');
const Log = require('../models/Log');

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

router.post('/clipSave', (req, res, next) => {

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

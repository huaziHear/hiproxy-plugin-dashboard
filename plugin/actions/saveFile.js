/**
 * @file
 * @author zdying
 */

var fs = require('fs');
var path = require('path');

module.exports = function (data, req, res) {
  fs.open(path.resolve(data.file), 'w', (err, fd) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    if (err) {
      res.end(JSON.stringify({
        status: 1,
        message: err.code === 'ENOENT' ? 'File not exists' : err.message,
        data: {}
      }));
    } else {
      fs.write(fd, data.content || '', function (err, written, string) {
        if (err) {
          res.end(JSON.stringify({
            status: 1,
            message: err.message,
            data: {}
          }));
        } else {
          res.end(JSON.stringify({
            status: 0,
            message: '',
            data: {}
          }));
        }
      });
    }
  });
}
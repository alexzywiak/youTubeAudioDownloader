var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var fs = require('fs');


/* GET home page. */
router.get('/:video_id', function(req, res, next) {
  youtube_dl = spawn('youtube-dl', ['--extract-audio', '--audio-format', 'mp3', "http://www.youtube.com/watch?v=" + req.params.video_id]);

  youtube_dl.stdout.on('data', function(data){
  	console.log(data.toString());
  });

  youtube_dl.stderr.on('data', function(data){
  	process.stderr.write(data);
  });

  youtube_dl.on('exit', function(){
  	fs.readFile('./' + req.params.video_id + '.mp3', function(err, data){
  		res.set({'Content-Type': 'audio/mpeg3'});
  		res.send(data);
  	});
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var fs = require('fs');


/* GET home page. */
router.get('/:video_id', function(req, res, next) {
	// Install youtube_dl locally: brew install youtube-dl
  youtube_dl = spawn('youtube-dl', ['--extract-audio', '--audio-format', 'mp3', "http://www.youtube.com/watch?v=" + req.params.video_id]);

  youtube_dl.stdout.on('data', function(data){
  	console.log(data.toString());
  });

  youtube_dl.stderr.on('data', function(data){
  	process.stderr.write(data);
  });

  // Install ffmpeg locally
  // brew install ffmpeg
  youtube_dl.on('exit', function(){
  	fs.readFile('./' + req.params.video_id + '.mp3', function(err, data){
  		res.render('index', {title: 'Scrape Some Audio'});
  	});
  });
});

module.exports = router;

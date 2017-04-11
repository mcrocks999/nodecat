var express = require('express')
var app = express()

var cat = require('./catgenerator.js');
cat.assets.top = 'assets/cat_top.png';
cat.assets.middle = 'assets/cat_middle.png';
cat.assets.bottom = 'assets/cat_bottom.png'

app.get('/', function (req, res) {
	var raw = req.query.c;
	var repeat = Math.floor(Math.random()*10);
	try {
		repeat = parseInt(raw);
		if (raw<1) raw = 1;
	} catch (err) {}
	cat.create(repeat, function(file, deletionCallback) {
		if (deletionCallback==false) { res.send('lwip is not installed, please contact the administrator.'); return; }
		res.sendFile(__dirname+'/'+file);
		deletionCallback();
	});
})

app.listen(9765, function () {
	console.log('CATZ IZ GENERATE AT UR INTERNETZ');
})
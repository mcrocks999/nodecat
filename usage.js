// Require our script
var cat = require('./catgenerator.js');

// Define where we are storing the assets required
cat.assets.top = 'assets/cat_top.png';
cat.assets.middle = 'assets/cat_middle.png';
cat.assets.bottom = 'assets/cat_bottom.png';

// Configuration
var repeat = 7;

// Create a cat
cat.create(repeat, function(file, deletionCallback) {
	// `file` is a string leading to the generated file.
	// Delete the file after we are done with it.
	// Eg. after we upload it to a Discord channel or copy it somewhere else...
	deletionCallback();
});
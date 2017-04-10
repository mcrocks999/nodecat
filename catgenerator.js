var assets = {
	top: '',
	middle: '',
	bottom: ''
};

function repeatCat(image,repeat,x,source,callback) {
	image.paste(62+(x*15), 0, source, function(err, image){
		if (repeat>0) {
			repeat--;x++;
			repeatCat(image,repeat,x,source,callback);
		} else {
			callback(image);
		}
	});
}

module.exports = {
	assets,
	create: function(repeat,callback) {
		try {
			console.log(require.resolve("lwip"));
		} catch(e) {
			callback('lwip is not installed',false);
			return;
		}
		var lwip = require('lwip');
		lwip.open(assets.top, function(err, start){
			lwip.open(assets.bottom, function (err, end){
				lwip.open(assets.middle, function (err, repeated){
					lwip.create(62+50+((repeat+1)*15), 54, [0,0,0,0], function(err, image){
						image.paste(0, 0, end, function(err, image){
							image.paste(62+((repeat+1)*15), 0, start, function(err, image){
								repeatCat(image,repeat,0,repeated,function(image) {
									var temporary = Math.floor(Math.random()*99999999)+'.png';
									image.writeFile(temporary, function(err){
										callback(temporary,function(){
											var fs = require('fs');
											fs.unlinkSync(temporary);
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}
};
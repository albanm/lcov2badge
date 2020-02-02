var fs = require('fs');
var byline = require('byline');
var shields = require('shields-lightweight');

exports.linesRatio = function(filePath, callback){
	var stream = byline(fs.createReadStream(filePath, { encoding: 'utf8' }));

	var instrumentedLines = 0;
	var coveredLines = 0;

	stream.on('data', function(line){
		if(line.indexOf('LF:') === 0) {
			instrumentedLines += parseFloat(line.split(':')[1]);
		}
		if(line.indexOf('LH:') === 0) {
			coveredLines += parseFloat(line.split(':')[1]);
		}
	});

	stream.on('error', callback);

	stream.on('end', function(){
		callback(null, coveredLines / instrumentedLines);
	});
};

exports.badge = function(options, callback) {
	// if options is a string then it is the file path to read
	if (typeof options === 'string') {
		options = {
			filePath: options
		};
	}

	// default options values
	options.okColor = options.okColor || 'brightgreen';
	options.warnColor = options.warnColor || 'orange';
	options.koColor = options.koColor || 'red';
	options.warnThreshold = options.warnThreshold || 80;
	options.koThreshold = options.koThreshold || 60;
	options.subject = options.subject || 'coverage';

	exports.linesRatio(options.filePath, function(err, ratio	){
		var percent = Math.round(ratio * 100);
		if(err) return callback(err);
		if(percent < options.koThreshold) return callback(null, shields.svg(options.subject, percent + '%', options.koColor, options.style));
		if(percent < options.warnThreshold) return callback(null, shields.svg(options.subject, percent + '%', options.warnColor, options.style));
		callback(null, shields.svg(options.subject, percent + '%', options.okColor, options.style));
	});
};

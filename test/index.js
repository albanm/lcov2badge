var assert = require('assert');

var lcov2badge = require('../');

describe('lcov2badge.linesratio', function() {
	it('should fetch the percentage of covered lines from a lcov.info file', function(callback) {
		lcov2badge.linesRatio('./test/resources/lcov.info', function(err, ratio) {
			if (err) throw err;
			assert.equal(Math.round(ratio * 100), 87);
			callback();
		});
	});
});

describe('lcov2badge.badge', function() {
	it('should create a badge from a file path', function(callback) {
		lcov2badge.badge('./test/resources/lcov.info', function(err, badge) {
			if (err) throw err;
			assert(badge.match('87'));
			//console.log(badge);
			callback();
		});
	});

	it('should create a badge from an options object', function(callback) {
		lcov2badge.badge({
			filePath: './test/resources/lcov.info'
		}, function(err, badge) {
			if (err) throw err;
			assert(badge.match('87'));
			//console.log(badge);
			callback();
		});
	});
});
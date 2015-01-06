var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var exec = require('child_process').exec;
var fs = require('fs');
var lcov2badge = require('./');

gulp.task('mkdir-build', function(callback){
	fs.exists('build', function(exists){
		if (!exists) {
			fs.mkdir('build', callback);
		} else {
			callback();
		}
	});
});

gulp.task('test-cover', ['mkdir-build'], function(callback) {
    exec('./node_modules/.bin/istanbul cover --dir ./build/coverage ./node_modules/.bin/_mocha', callback);
});

gulp.task('cover-badge', ['test-cover'], function(callback) {
    lcov2badge.badge('./build/coverage/lcov.info', function(err, svgBadge){
    	if (err) return callback(err);
    	fs.writeFile('./build/coverage/badge.svg', svgBadge, callback);
    });
});

gulp.task('git-config', function(callback){
	exec('git config --global user.email "alban.mouton@gmail.com" && git config --global user.name "Alban Mouton through Travis-CI"', callback);
});

gulp.task('deploy-build', ['cover-badge', 'git-config'], function() {
	var deployOptions = {
		cacheDir: './build/repos/lcov2badge'
	};
	if (process.env.githubToken) {
		console.log('"githubToken" environment variable found, use it to authenticate to github');
		deployOptions.remoteUrl = 'https://' + process.env.githubToken + '@github.com/albanm/lcov2badge';
	}
	return gulp.src('./build/**/*')
		.pipe(deploy(deployOptions));
});

gulp.task('default', ['cover-badge']);
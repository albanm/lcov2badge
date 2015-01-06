# lcov2badge

[![Build status](https://img.shields.io/travis/albanm/lcov2badge.svg)](https://travis-ci.org/albanm/lcov2badge)

*A simple tool that produces a badge inspired by shields.io from a lcov.info file*

For example the following badge is self served by this project, not by any service provider. Click it to access a lcov report in HTML.

[![Tests code coverage status](http://albanm.github.io/lcov2badge/coverage/badge.svg)](http://albanm.github.io/lcov2badge/coverage/lcov-report/index.html)

## Install

    npm install lcov2badge


## usage

```javascript
var lcov2badge = require('lcov2badge');
lcov2badge.badge('./coverage/lcov.info', function(err, svgBadge){
    if (err) throw err;
    console.log(svgBadge);
});
```

Use options instead of file path as first parameter:

```javascript
var options = {
    filePath: './coverage/lcov.info',
    okColor: 'green', 					// default is 'brightgreen'
    warnColor: 'yellow', 				// default is 'orange'
    koColor: 'orange', 					// default is 'red'
    warnThreshold: 90, 					// default is 80
    koThreshold: 70,					// default is 60
    subject: 'cover'					// default is 'coverage'
};
lcov2badge.badge(options, function(err, svgBadge){...});
```

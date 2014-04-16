# gulp-adhoc

## Information

`gulp-adhoc` is designed to allow easy composition of sequential and parallel tasks via the command line.

**NOTE: This module depends on [`run-sequence`](https://github.com/OverZealous/run-sequence), which is a temporary solution while the [new task system](https://github.com/gulpjs/gulp/issues/355) is in development. `gulp-adhoc` will either adapt to the new order (if useful), or be retired.**

## Usage

Just require `gulp-adhoc` at the top of your gulpfile, passing it your gulp instance.

### gulpfile.js
```javascript
var gulp  = require('gulp');
var gutil = require('gulp-util');
var runs  = require('run-sequence');

require('gulp-adhoc')(gulp, gutil.env);
```

### CLI
```bash
# Simple sequence
gulp clean,build,test,deploy

# Sequence with parallel sections
gulp clean,[coffee,less,jade],[min-css,min-js,min-img],inject
```

---

## BONUS!

If you find yourself using the same _ad hoc_ commands repeatedly, you can promote them to tasks like this...

### gulpfile.js
```javascript
var gulp  = require('gulp');
var gutil = require('gulp-util');
var runs  = require('run-sequence');

gulp.task('do-the-thing', function(done) {
  runs(
    'clean',
    ['coffee','less','jade'],
    ['min-css','min-js','min-img'],
    'inject',
    done);
});

```

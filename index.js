/* jshint node:true */
'use strict';

var runs  = require('run-sequence');

module.exports = function(gulp, env) {

  function createTask(taskName, taskSets) {
    return gulp.task(taskName, function(done) {
      runs.apply(null, taskSets.concat([done]));
    });
  }

  // For each param, check if it is an adhoc task.
  // If so, create a new task with the same name.
  env._.forEach( function(task) {
    if (/(,|\[)/.test(task)) {
      var json = task.replace(/([^,\[\]]+)/g, '"$1"');
      var obj = JSON.parse('{"taskSets": [' + json + ']}');
      createTask(task, obj.taskSets);
    }
  });

};

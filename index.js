/* jshint node:true */
'use strict';

module.exports = function (gulp, env) {

  function createTask(taskName, taskSets) {
    return gulp.task(taskName, gulp.series.apply(gulp, taskSets.map(function (taskSet) {
      return Array.isArray(taskSet) ? gulp.parallel.apply(gulp, taskSet) : taskSet;
    })));
  }

  // For each CLI param, check if it is an adhoc task (contains commas or brackets).
  // If so, create a new task with the same name.
  env._.forEach( function(task) {
    if (/(,|\[)/.test(task)) {
      var json = task.replace(/([^,\[\]]+)/g, '"$1"');
      var obj = JSON.parse('{"taskSets": [' + json + ']}');
      createTask(task, obj.taskSets);
    }
  });

};

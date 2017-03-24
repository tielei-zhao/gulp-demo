# gulp-demo
gulp 

## 使用gulp，仅需知道4个API即可：gulp.task(),gulp.src(),gulp.dest(),gulp.watch()

> gulp.task()
* 用来定义任务，内部使用的是Orchestrator
*gulp.task('default',function(){console.log('hello world');});

> gulp.src()
* 用来读取需要操作的文件
* gulp.task('task1',function(){gulp.src('js/*.js').pipe(gulp.dest('test'));});

> gulp.dest()
* 用来写文件的
* gulp.task('task2',function(){gulp.src('js/test/*.js',{base:'js'}).pipe(gulp.dest('test'));});

> gulp.watch()
* 用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。
* gulp.task('watch',function(){gulp.watch('js/test/*.js',['task1']);})

/*使用gulp，仅需知道4个API即可：gulp.task(),gulp.src(),gulp.dest(),gulp.watch()*/
var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();








gulp.task('default',function(){
    console.log('hello world');
});

/*gulp.src()是用来读取需要操作的文件*/

gulp.task('task1',function(){
	//gulp.dest(path)生成的文件路径是我们传入的path参数后面再加上gulp.src()中有通配符开始出现的那部分路径。例如：
    gulp.src('js/*.js')
    .pipe(gulp.dest('test'));
});

/*gulp.dest()方法是用来写文件的*/

gulp.task('task2',function(){
	//通过指定gulp.src()方法配置参数中的base属性，我们可以更灵活的来改变gulp.dest()生成的文件路径。
    gulp.src('js/test/*.js',{base:'js'})
    .pipe(gulp.dest('test'));
});



/*gulp.task方法用来定义任务，内部使用的是Orchestrator*/

gulp.task('task3',function(){
    console.log('task3');
});

gulp.task('task4',['task3','default'],function(){
	//gulp.task('mytask', ['array', 'of', 'task', 'names'], function() { //定义一个有依赖的任务
  	// Do something
	//});
	//注意：如果任务相互之间没有依赖，任务会按你书写的顺序来执行，如果有依赖的话则会先执行依赖的任务。
	console.log("task4")

	//异步处理方案：
	//	第一种：在异步操作完成后执行一个回调函数来通知gulp这个异步任务已经完成,这个回调函数就是任务函数的第一个参数。
		/*gulp.task('one',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
		  //one是一个异步执行的任务
		  setTimeout(function(){
		    console.log('one is done');
		    cb();  //执行回调，表示这个异步任务已经完成
		  },5000);
		});

		//这时two任务会在one任务中的异步操作完成后再执行
		gulp.task('two',['one'],function(){
		  console.log('two is done');
		});*/
	//	第二种：定义任务时返回一个流对象。适用于任务就是操作gulp.src获取到的流的情况。
		//gulp.task('one',function(cb){
		//   var stream = gulp.src('client/**/*.js')
		//       .pipe(dosomething()) //dosomething()中有某些异步操作
		//       .pipe(gulp.dest('build'));
		//     return stream;
		// });

		// gulp.task('two',['one'],function(){
		//   console.log('two is done');
		// });

	//	第三种：返回一个promise对象，例如
		/*var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
		gulp.task('one',function(cb){
		  var deferred = Q.defer();
		  // 做一些异步操作
		  setTimeout(function() {
		     deferred.resolve();
		  }, 5000);
		  return deferred.promise;
		});

		gulp.task('two',['one'],function(){
		  console.log('two is done');
		});*/
});



/*gulp.watch()用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。*/
gulp.task('task5',function(){
	//gulp.task('uglify',function(){
	  //do something
	//});
	//gulp.task('reload',function(){
	  //do something
	//});
	//gulp.watch('js/**/*.js', ['uglify','reload']);
})

gulp.task('watch',function(){
	gulp.watch('js/test/*.js',['task1']);
})


/*gulp-rename*/
gulp.task('rename',function(){
	gulp.src('js/test/*.js')
	.pipe(plugins.rename('test-rename/test-rename.js'))
	.pipe(gulp.dest('test'))
})

//gulp-uglify
gulp.task('minify-js', function () {
	gulp.src('js/test/*.js')
	.pipe(plugins.uglify())
	.pipe(plugins.rename('test.min.js'))
	.pipe(gulp.dest('test/test-uglify'));
})

//gulp-minify-css
gulp.task('minify-css', function () {
	gulp.src('css/*.css')
	.pipe(plugins.minifyCss())
	.pipe(plugins.rename('test.min.css'))
	.pipe(gulp.dest('test/test-minify-css'));
})

//gulp-minify-html
gulp.task('minify-html',function(){
	gulp.src('*.html')
	.pipe(plugins.minifyHtml())
	.pipe(plugins.rename('test-minify.html'))
	.pipe(gulp.dest('test/test-minify-html'));
})

//gulp-jshint
gulp.task('jsLint',function(){
	gulp.src('js/main.js')
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter());
})

//gulp-concat
gulp.task('concat',function(){
	gulp.src('js/*.js')
	.pipe(plugins.concat('all.js'))
	.pipe(gulp.dest('test/test-concat'));
})

//gulp-imagemin
gulp.task('imagemin',function(){
	gulp.src('images/**')
	.pipe(plugins.imagemin({

	}))
	.pipe(gulp.dest('test/test-imagemin'));
})
/*//imagemin 参数：
plugins.imagemin({
	optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
	progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
	interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
	multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
})
//深度压缩图片
plugins.imagemin({
	progressive: true,
	svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
	use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件		
})	
//只压缩修改的图片
plugins.cache(plugins.imagemin({
	progressive: true,
	svgoPlugins: [{removeViewBox: false}],
	use: [pngquant()]
}))*/

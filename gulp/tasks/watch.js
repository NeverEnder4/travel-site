//IMPORT REQUIRED PACKAGES
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();


//TASK THAT WATCHES OUR INDEX.HTML, CSS FOLDERS/FILES AND POINTS THE SERVER TO INDEX.HTML FOLDER LOCATION
gulp.task('watch', function () {

    browserSync.init({
        
        //TURNED OF NOTIFICATIONS
        notify: false,

        //TELLS THE SERVER WHICH FOLDER TO POINT TO
        server: {
            baseDir: 'app'
        }
    });

    //WHEN THERE IS A CHANGE TO INDEX.HTML RELOAD THE BROWSER
    watch('./app/index.html', function () {
        browserSync.reload();
    });

    //WHEN THERE IS A CHANGE TO ANY CSS FOLDER OR FILE INJECT THE CHANGES WITHOUT RELOADING
    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    });

});

//WHEN STYLES TASK HAS FINISHED, RUN CSS INJECT
gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
});

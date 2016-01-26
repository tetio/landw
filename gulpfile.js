var gulp = require("gulp");
var connect = require("gulp-connect");
var watch = require("gulp-watch");
var tsc = require("gulp-tsc");
var notify = require("gulp-notify");

gulp.task("webserver", function () {
    connect.server({
        root: ["build"],
        port: 8888,
        livereload: true
    });
});

gulp.task("livereload", function () {
    gulp.src(["build/*.js", "root/**/*.*"])
        .pipe(watch())
        .pipe(connect.reload());
});

gulp.task("root", function () {
    gulp.src(["root/**/*"], { base: 'root'}).pipe(gulp.dest("build"));
    gulp.src(["lib/**/*"], { base: 'lib' }).pipe(gulp.dest("build"));
    gulp.src(["src/**/*.ts"], { base: 'src'}).pipe(gulp.dest("build/src"));
});

gulp.task("compile", function () {
    return gulp.src(["src/Main.ts"])
        .pipe(tsc({
            out: "game.js",
            sourceMap: true,
            emitError: true
        }))
        .on("error", notify.onError({ message: "Error: <%= error.message %>", title: "Typescript Error"}))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", function () {
    gulp.watch("src/**/*.ts", ["compile"]);
    gulp.watch("root/**/*.*", ["root"]);
});

gulp.task("default", ["root", "compile", "webserver", "livereload", "watch"]);

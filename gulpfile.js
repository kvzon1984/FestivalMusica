const { series, parallel, src, dest, watch } = require('gulp');
const sass = require("gulp-dart-sass");
const imagenmin = require("gulp-imagemin");
const notificacion = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require('gulp-concat');

//utilidades CSS

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS

const terser = require('gulp-terser-js');
const rename = require("gulp-rename");

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'

}

//funcion que compila SASS

function compilarSASS() {
    return src(paths.scss) //donde buscar el archivo sass
        .pipe(sourcemaps.init())
        .pipe(sass()) //compilalo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css')) // guardalo en esta ubicacion
}

// function minificarCss() {
//     return src(paths.scss)
//         .pipe(sass({
//             outputStyle: 'compressed'
//         }))
//         .pipe(dest('./build/css'))
// }

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./build/js'))
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagenmin())
        .pipe(dest('./build/img'))
        .pipe(notificacion({ message: 'Imagen Minificada' }))
}

function versionwebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notificacion({ message: 'Imagen webp lista' }))
}

//watch queda a la escucha de algun cambio en un archivo y ejecuta la funcion si es que cambia dicho archivo
// watch('RUTA DEL ARCHIVO QUE DEBE ESCUCHAR', FUNCION QUE DEBE EJECUTAR CUANDO HAY CAMBIOS EN ESE ARCHIVO)
function watchArchivos() {
    watch('src/scss/**/*.scss', compilarSASS);
    watch(paths.js, javascript);
}


exports.compilarSASS = compilarSASS;
exports.imagenes = imagenes;
exports.javascript = javascript
exports.watchArchivos = watchArchivos;

exports.default = series(imagenes, javascript, versionwebp, compilarSASS, watchArchivos)
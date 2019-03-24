const minifier = require('./minify');
var fileSelected = false;

document.getElementById('inputGroupFile02').onchange = (e) => {
    if (e.target.value) {
        fileSelected = !fileSelected;
        document.getElementById('lblInput').innerHTML = document.getElementById('inputGroupFile02').files[0].path;
    }
}
document.getElementById('btnMinify').addEventListener('click', (e) => {
    if (document.getElementById('inputGroupFile02').value) {
        document.querySelector('#loading-overlay').hidden = false;
        minifier.run(document.getElementById('inputGroupFile02').files[0].path);
    }
})
const fs = require('fs');
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
const gcc = require('@node-minify/google-closure-compiler');
const cleanCSS = require('@node-minify/clean-css');
const path = require('path');

var minifyCSSFile = (fileName) => {
  minify({
    compressor: cleanCSS,
    input: fileName,
    output: fileName,
    callback: function (err, min) { }
  }).then(() => {
  }).catch((err) => {
  })
}

var minifyJSFile = (fileName) => {
  minify({
    compressor: gcc,
    input: fileName,
    output: fileName,
    callback: function (err, min) { }
  }).then(() => {
  }).catch((err) => {

  })
}

var minifyHTMLFile = (fileName) => {
  minify({
    compressor: htmlMinifier,
    input: fileName,
    output: fileName,
    callback: function (err, min) { }
  }).then(() => {
  }).catch((err) => {

  })
}

var minifyFiles = (dirName) => {

  return new Promise((resolve, reject) => {
    fs.readdir(dirName, async (err, files) => {
      for (var file of files) {
        console.log('Processing : ' + file);
        var currentDir = path.join(dirName, file).toString();
        if (currentDir != minify.js) {
          if ((fs.statSync((currentDir)).isDirectory())&&(file !== 'node_modules')) {
            await minifyFiles(currentDir);
          }
          else {
            fileSizeProcessed += fs.statSync(currentDir);
            if (path.extname(currentDir) == '.ejs' || path.extname(currentDir) == '.html') minifyHTMLFile((currentDir));
            else if (path.extname(currentDir) == '.js') minifyJSFile((currentDir));
            else if (path.extname(currentDir) == '.css') minifyCSSFile((currentDir));
          }

        }
      }
      resolve();
    });
  })


}

async function run(dirName) {
  minifyFiles(dirName).then(() => {
    document.querySelector('#loading-overlay').hidden = true;
    alert('Web App Minified');
  })
}

module.exports = {
  minifyFiles,
  minifyCSSFile,
  minifyHTMLFile,
  minifyJSFile,
  run
};
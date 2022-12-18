/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 3rd
 * Author: Stephane and Fernado
 * 
 */
const fs = require("fs").promises;
const { dir } = require("console");
const fsc = require("fs");
const { resolve } = require("path");
const unzipper = require('unzipper')
const PNG = require('pngjs').PNG
const path = require('path');
const { pipeline} = require("stream");



/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */

 const unzip = (pathIn, pathOut) => {
  return new Promise ((resolve, reject) => {
    // made into promise so that it can run in proper order
  fsc.createReadStream(pathIn)
  // read given path
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise()
    .then(() => console.log("Extraction operation complete"))
    .catch(err => console.log(err));
})
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
 let pngDir = [];

const readDir = (dir) => {
return new Promise((resolve, reject) => {
fs.readdir(dir)
.then ((folder) => {
  //created empty array to push documents to

  //Loop through items in folder to check for png files
  for ( item of folder) {
  if (path.extname(item) == ".png") {
    pngDir.push(item); 
  } 
  }
  console.log(pngDir);
  return (pngDir)

})
.catch(err => console.log(err));
})
};




/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
 const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fsc.createReadStream(pathIn)
    //read the piped stream
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;

            //Created variables for RGB

            const red = (this.data[idx]);
            const green = (this.data[idx + 1]);
            const blue = (this.data[idx + 2]);
            //Formula for grayscale
            const gray = (red + green + blue) / 3
            //Apply formula of gray
            this.data[idx] = gray
            this.data[idx + 1] = gray
            this.data[idx + 2] = gray

          }
        }
        // Write the grayscaled photos to pathout 
        this.pack().pipe(fsc.createWriteStream(pathOut))
          .on("error", (err) => console.log(err))
          .on("close", () => {
            console.log("Changed to Grayscale")
          });
      }).on("error", (err) => console.log(err))
  })
}

module.exports = {
  unzip,
  readDir,
  grayScale
};


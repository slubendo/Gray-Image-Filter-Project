const path = require("path");
const fs = require("fs").promises;
const { dir } = require("console");
const fsc = require("fs");
const { resolve } = require("path");
const unzip = require('unzipper')
const PNG = require('pngjs').PNG
const stream = require("stream")
/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

 
IOhandler.unzip("myfile.zip", "PathOut")

//Unzip works when called alone and then readDir and grayscale work when called after. However not its Synchronous and not sure how to make them happen one after the next.
// Have to call unzip by itself then readdir to change colors.

IOhandler.readDir("PathOut").then(folder => {
  folder.map((file) => {
      grayScale(`PathOut/${file}`, `PathOut/${file}`)
          .then((msg) => console.log(msg) ).catch(err => console.log(err));
  })
});

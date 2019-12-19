# osu-beatmap-dl
![NpmVersion](https://img.shields.io/npm/v/osu-beatmap-dl.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/osu-beatmap-dl.svg?style=flat-square)
![NodeVersion](https://img.shields.io/node/v/osu-beatmap-dl.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/loarca/osu-beatmap-dl.svg?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/loarca/osu-beatmap-dl.svg?style=flat-square&label=Stars)
![GitHub issues](https://img.shields.io/github/issues/loarca/osu-beatmap-dl.svg?style=flat-square)
![GitHub closed issues](https://img.shields.io/github/issues-closed/loarca/osu-beatmap-dl.svg?style=flat-square)

Simple and easy-to-use node package for downloading osu! beatmaps from either osu website or bloodcat.

## Installation
```sh
npm install osu-beatmap-dl
```

## Usage
```js
const downloadBeatmapset = require('osu-beatmap-dl');

// Download beatmap set
downloadBeatmapset({
  beatmapsetID: 16653, // ID number representing the beatmap set to download
  downloadFolder: '.', // (optional) Folder where the .osz file will be saved
  noVideo: false // (optional) true if video is not desired, false otherwise
}).then(() => console.log('Beatmap has been successfully downloaded!'))
  .catch(e => console.error(e));
````

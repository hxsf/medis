'use strict';

const path = require('path');
const packager = require('electron-packager')
const pkg = require('../package');
const os = require('os');

const program = require('commander');
program
  .version(pkg.version)
  .option('-p, --platform [platform]', 'Platform (linux, win32, mas)')
  .option('-d, --deploy', 'Deploy')
  .parse(process.argv);

const platform = program.platform || os.platform().replace('darwin', 'mas');
const deploy = program.deploy;

packager({
  arch: 'x64',
  platform: platform,
  dir: deploy ? path.join(__dirname, '..', 'deploy') : path.join(__dirname, '..'),
  version: '1.4.7',
  'app-version': pkg.version,
  'build-version': pkg.version,
  asar: false && deploy,
  icon: path.join(__dirname, '..', 'resources', 'icon'),
  name: 'Medis',
  out: path.join(__dirname, '..', deploy ? 'dist-deploy' : 'dist'),
  overwrite: true,
  prune: false && deploy,
  // OS X
  'app-bundle-id': 'li.zihua.medis',
  'app-category-type': 'public.app-category.developer-tools',
  'osx-sign': false,
  download: {
    cache: path.join(__dirname, '..', 'cache')
  }
}, function done (err, appPath) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(appPath[0]);
});

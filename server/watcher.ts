import logger from '../logger'
import * as chokidar  from 'chokidar';


export class Watcher {
  constructor(dir: string) {
    var watcher = chokidar.watch(dir, {ignoreInitial: true, persistent: true});

    logger.info(`Start watch dir: ${dir}`);

   // todo: check config.yml
   // todo: check rules.yml

    watcher
      .on('add', function (path) {
        console.log('File', path, 'has been added');
      })
      .on('change', function (path) {
        console.log('File', path, 'has been changed');
      })
      .on('unlink', function (path) {
        console.log('File', path, 'has been removed');
      })
      .on('error', function (error) {
        console.error('Error happened', error);
      })
  }
}

#!/usr/bin/env node
const colors = require('colors');
const Commander = require('commander').Command;
const pjson = require('../package.json');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const {logger} = require('../logger');
const program = new Commander('fiddler');
const server = require('../server/server');
const {loadConfig, makeConfig} = require('../server/config/config');
const rimraf = require('rimraf');


program
  .version(pjson.version)
  .option('--force', 'Ignore empty project');

program
  .command('setup [dir]')
  .description('Create new project')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .option("--force", "rewrite configs")
  .action((env, options = {}) => {

    logger.info('Start setup new project');
    const dir = options.dir || '.fiddler';

    if (options.parent.force) {
      rimraf(dir, () => {
        createDir(dir);
      })
    } else {
      createDir(dir);
    }
  });

function createDir(dir) {
  fs.mkdir(dir, (err) => {
    if (err) {
      return logger.error(err.message);
    }
    const data = {
      proxy_server: {
        address: 'localhost',
        port: 1337,
      }
    };
    makeConfig(dir + '/config.yml', data).then(
      () => {
        logger.info('Config has been created!');
        logger.info('==> Done! <==');
      },
      (err) => {
        console.log(err);
        return logger.error(err);
      }
    );
  });
}

program
  .command('run')
  .description('Run proxy server')
  .option("--config  [config_file]", "Start proxy server")
  .action(({config = '.fiddler/config.yml'}) => {
    const cfg = loadConfig(path.join(process.cwd(), config));
    //
    server.server(cfg);
  });

program.parse(process.argv);


if (!program.args.length)
  program.help();

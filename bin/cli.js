#!/usr/bin/env node
const colors = require('colors');
const Commander = require('commander').Command;
const pjson = require('../package.json');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const program = new Commander('fiddler');
const server = require('../server/server');


program
  .version(pjson.version)
  .option('--force', 'Ignore empty project');

program
  .command('setup [dir]')
  .description('Create new project')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action((env, options = {}) => {
    logger.info('Start setup new project');
    fs.mkdir(options.dir || '.fiddler', 644, (err) => {
      logger.error(err.message);
    });
  });

program
  .command('run')
  .description('Run proxy server')
  .option("--config  [config_file]", "Start proxy server")
  .action(({config = '.fiddler/config.yml'}) => {
    const cfg = server.loadConfig(path.join(process.cwd(), config));
    
    server.server(cfg);
  });

program.parse(process.argv);


if (!program.args.length)
  program.help();

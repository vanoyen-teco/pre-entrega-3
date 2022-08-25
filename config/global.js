#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;
const logger = require("./logger");
require('dotenv/config');

let mongostoreConfig = require('./mongoStoreConfig');
const mainPath = 'https://vanoyen.com.ar/';
const imgPath = 'api/fotos/';

const PORT = (argv.port !== undefined)?argv.port:8080;
const MODE = argv.mode || 'fork';
const GZIP = argv.gzip || false;

let maxCPUs = (process.env.MAX_CPUS !== undefined)?process.env.MAX_CPUS:1;

const totalCpus = require("os").cpus().length;
const NODE_ENV = (process.env.NODE_ENV !== undefined)?process.env.NODE_ENV:'production';

maxCPUs = (maxCPUs < totalCpus && NODE_ENV == 'production')?maxCPUs:totalCpus;

if(process.env.MAX_AGE !== undefined){
    mongostoreConfig.cookie.maxAge = parseInt(process.env.MAX_AGE);
    logger.loggerConsole.log(`Max Age set on: ${mongostoreConfig.cookie.maxAge}`);
}

module.exports = {
    argv,
    mongostoreConfig,
    mainPath,
    imgPath,
    maxCPUs,
    global: {
        PORT: PORT,
        MODE: MODE,
        GZIP: GZIP
    }
}
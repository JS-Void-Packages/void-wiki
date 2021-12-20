import pug from 'pug'
import LogManager from 'void-logger';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import TOML from '@iarna/toml';
const buildLogger = LogManager.getOrCreateLogger('./log/build.log');
const logger = LogManager.getOrCreateLogger('./log/latest.log');

/**
 * Load a file
 * @param {string} file 
 * @returns {string}
 */
 const loadFile = (file) => {
    return readFileSync(file, 'utf8');
}

/**
 * Load a TOML file
 * @param {string} file 
 * @returns {Object}
 */
const loadTOML = (file) => {
    logger.log(`Loaded ${file.slice(2)}`);
    return TOML.parse(loadFile(file));
}

buildLogger.clear()
logger.clear()

// load the config
let config = loadTOML('./config.toml')

//let pages = loadPages()

//let compile = pug.compile('./pugtest/index.pug')

logger.log('Building app!')
buildLogger.log('Building app!')
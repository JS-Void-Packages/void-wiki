/*
    fileLoading.js | Mrthomas20121 - 2021
    Load the toml files
*/
const fs = require('fs')
const path = require('path')
const voidLogger = require('void-logger')
const TOML = require('@iarna/toml')
const resourceLocation = require('./resource_location')
const Logger = new voidLogger('void-wiki').setLogLocation('.')

/**
 * Load a file
 * @param {string} file 
 * @param {boolean} shouldLog 
 * @returns {string}
 */
const loadFile = (file, shouldLog=false) => {
    if(shouldLog) Logger.info(`Loaded file ${file}`)
    return fs.readFileSync(file, 'utf8')
}

/**
 * Load a TOML file
 * @param {string} file 
 * @returns {{}}
 */
const loadTOML = (file) => {
    return TOML.parse(loadFile(file))
}

let templates = []

const loadTemplates = () => {
    let f = './docs/template'
    const folder = fs.readdirSync(f)
    for(let file of folder) {
        // only load .toml files
        if(file.endsWith('.toml')) {
            let file_path = path.join(f, file)
            let name = file.split('.')[0]
            templates.push(loadTOML(file_path))
        }
    }
}

/**
 * Find a Template and return its data.
 * @param {string} template_name 
 */
const findTemplate = (template_name) => {

}

const readTemplate = () => {

}

loadTemplates()

console.log(templates)
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

const loadTemplates = () => {
    let templates = []
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
    return templates
}

class TemplateManager {
    templates = []
    html_templates = []
    sidebar = ''

    constructor() {}

    /**
     * 
     * @param {any} item 
     */
    add(item) {
        this.templates.push(item)
    }

    readTemplate(template) {
        let result = template
        this.html_templates.push(result)
    }
}

class Element {

    attribute_list = {}

    /**
     * @type {Element[]}
     */
    children = []

    /**
     * @param {string} name 
     */
    constructor(name) {
        // if name has a dot, get the latest part of the string
        if(name.includes('.')) {
            let nameSplit = name.split('.')[name.length-1]
            this.custom_name = nameSplit
        }
        else {
            this.custom_name = name
        }
    }

    addAttributeFromMap(map) {
        this.attribute_list = map
    }

    /**
     * Add an attribute
     * @param {string} name 
     * @param {*} value 
     */
    addAttribute(name, value) {
        this.attribute_list[name] = value
    }

    buildAttribute() {
        let keys = Object.keys(this.attribute_list)
        if(keys.length > 0) {
            let output = ' '
            for(let key of keys) {
                let elem = this.attribute_list[key]
                output+=`${key}=${elem}`
            }
            return output
        }
        return ''
    }

    buildElement() {
        let html = `<${this.custom_name}${this.buildAttribute()}>`

        // check if it has children
        if(this.children.length > 0) {
            for(let child of this.children) {
                html = child.buildElement()
            }
        }
        html+=`</${this.custom_name}>`
        return html
    }
}

/**
 * 
 * @param {{}} template 
 * @returns {string}
 */
const readTemplate = (template) => {
    let html = ''
    
    for(let base_key in template) {
        let curr_object = template[base_key]
        let element = new Element(base_key)
        if(curr_object.hasOwnProperty('attribute')) {
            element.addAttributeFromMap(curr_object.attribute)
        }
        html+=element.buildElement()
    }

    return html
}



console.log(readTemplate(loadTOML('./docs/template/sidebar.toml')))
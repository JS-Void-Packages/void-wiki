/*
    ResourceLocation - a port of Mojang ResourceLocation to javascript
    Mrthomas20121 - 2021
*/
const path = require('path')

module.exports = class ResourceLocation {
    /**
     * 
     * @param {string} name 
     * @param {string} resource 
     */
    constructor(name, resource) {
        this.resource_name = name
        this.path_to_resource = resource
    }

    /**
     * create a resourceLocation from an array
     * @param {string[]} array 
     */
    static fromArray(array) {
        if(array.length > 2) {
            console.log('Error, Array Length is higher than 2')
        }
        else {
            return new ResourceLocation(array[0], array[1])
        }
    }

    /**
     * Create a resourceLocation from a string
     * @param {string} str 
     */
    static fromString(str) {
        return this.fromArray(str.split(':'))
    }

    getPath() {
        return this.path_to_resource
    }

    getName() {
        return this.resource_name
    }

    getFullPath() {
        let left_path = ''
        if(this.resource_name == 'images') {
            left_path=path.join('.', this.resource_name)
        }
        return path.join(left_path, this.path_to_resource)
    }
}
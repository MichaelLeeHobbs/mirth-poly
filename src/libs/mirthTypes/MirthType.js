const xml2js = require('xml2js')
const xmlBuilder = new xml2js.Builder()

const stringToBoolean = (str) => {
    if (!str.toLowerCase) return str
    if (str.toLowerCase() === 'true') return true
    if (str.toLowerCase() === 'false') return false
    return str
}

class MirthType {
    constructor({name, key = '', type = 'string', value = '', structure = 'array'}) {
        this._name = name
        this._key = key
        this._type = type
        this._structure = structure
        this._value = (structure === 'array') ? [value] : {[key]: value}
        this.value = value
    }

    get name() {
        return this._name
    }

    get key() {
        return this._key
    }

    get type() {
        return this._type
    }

    get structure() {
        return this._structure
    }

    get value() {
        // return (this.structure === 'array') ? [this._value] : {[this.key]: this._value}
        return (this.structure === 'array') ? this._value : {[this.key]: this._value}
    }

    set value(value) {
        let val = (this.type === 'boolean') ? stringToBoolean(value) : value
        if (this.structure === 'array') {
            if (typeof val !== this._type) throw new Error(`Expected value to be typeof ${this._type} but typeof value is ${typeof val} for value: "${val}" with name: "${this.name}"`)
            this._value[0] = val
        } else {
            this._value[this.key] = val
        }
    }

    /**
     * Converts the Mirth Type into JSON that is ready to be converted into XML.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    // stringify(replacer, space) {
    //     let val = (this.structure === 'array') ? [value] : {[key]: value}
    //     return JSON.stringify(val, replacer, space)
    // }

    toXml() {
        return xmlBuilder.buildObject(this.value)
    }
}

module.exports = MirthType

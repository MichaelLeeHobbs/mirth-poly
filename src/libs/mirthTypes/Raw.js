const MirthType = require('./MirthType')
const xml2js = require('xml2js')
const xmlBuilder = new xml2js.Builder()

class Raw extends MirthType {
    constructor({name, value = ''}) {
        super({name, type: 'raw', value})
        console.warn(`TODO! Replace raw type "${name}"`)
    }

    get type() {
        return 'raw'
    }

    set value(value) {
        this._value = value
    }

    get value() {
        return this._value
    }

    toXml() {
        return xmlBuilder.buildObject(this._value)
    }

}

module.exports = Raw

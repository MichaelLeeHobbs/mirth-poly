class MirthObject {
    constructor({debug}) {
        this._debug = debug
    }
    parseXml(xml) {
        throw new Error('Not implemented!')
    }
    parseJson(json) {
        throw new Error('Not implemented!')
    }
    parseXmlJson(xjson) {
        throw new Error('Not implemented!')
    }
    toXml() {
        throw new Error('Not implemented!')
    }
    toJson() {
        throw new Error('Not implemented!')
    }

    get debug() {
        return this._debug
    }

    set debug(value) {
        this._debug = value
    }
}

module.exports = MirthObject

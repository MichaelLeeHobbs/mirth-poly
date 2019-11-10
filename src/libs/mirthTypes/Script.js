const MirthType = require('./MirthType')
const xml2js = require('xml2js')
const fs = require('fs-extra')

class Script extends MirthType {
    constructor({code = '', filepath}) {
        super({type: 'script', value: code})
        this._filepath = filepath
    }

    get code() {
        return this._code
    }

    set code(value) {
        this._code = value
    }

    get filepath() {
        return this._filepath
    }

    set filepath(value) {
        this._filepath = value
    }

    readSync() {
        if (!this._filepath) throw new Error('Script.filepath is undefined!')
        this.value = fs.readFileSync(this._filepath)
    }
    writeSync() {
        if (!this._filepath) throw new Error('Script.filepath is undefined!')
        fs.writeFileSync(this._filepath, this.value)
    }
}

module.exports = Script

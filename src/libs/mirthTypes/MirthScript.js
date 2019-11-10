const MirthType = require('./MirthType')
const fs = require('fs-extra')

class MirthScript extends MirthType {
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
        if (!this._filepath) throw new Error('MirthScript.filepath is undefined!')
        this.value = fs.readFileSync(this._filepath)
    }
    writeSync() {
        if (!this._filepath) throw new Error('MirthScript.filepath is undefined!')
        fs.writeFileSync(this._filepath, this.value)
    }
}

module.exports = MirthScript

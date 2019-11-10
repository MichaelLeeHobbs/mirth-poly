const MirthType = require('./MirthType')

class Meta extends MirthType {
    constructor({version, mirthClass}) {
        super({type: 'object'})
        this._version = version
        this._mirthClass = mirthClass
    }

    get version() {
        return this._version
    }

    set version(value) {
        this._version = value
    }

    get mirthClass() {
        return this._mirthClass
    }

    set mirthClass(value) {
        this._mirthClass = value
    }

    toJson(stringify) {
        let res = {"class": this.mirthClass, version: this.version}
        return (stringify) ? JSON.stringify(res) : res
    }
}

module.exports = Meta

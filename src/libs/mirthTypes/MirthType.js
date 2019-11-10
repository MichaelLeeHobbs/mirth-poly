const stringToBoolean = (str) => {
    if (!str.toLowerCase) return str
    if (str.toLowerCase() === 'true') return true
    if (str.toLowerCase() === 'false') return false
    return str
}

class MirthType {
    constructor({key = '', type = 'string', value = '', structure = 'array', debug = false}) {
        this._key = key
        this._mirthType = type
        this._structure = structure
        this._value = value
        this._value = Array.isArray(value) ? value[0] : value
        this._isDirty = false
        this._debug = debug
    }

    extractParam(params, key) {
        let res = Array.isArray(params) ? params[0][key] : params[key]
        res = (Array.isArray(res)) ? res[0] : res
        return  res
    }

    get debug() {
        return this._debug
    }

    set debug(value) {
        this._debug = value
    }

    get key() {
        return this._key
    }

    get mirthType() {
        return this._mirthType
    }

    get structure() {
        return this._structure
    }

    get value() {
        // return (this.structure === 'array') ? [this._value] : {[this.key]: this._value}
        // return (this.structure === 'array') ? this._value[0] : {[this.key]: this._value}
        return this._value
    }

    set value(value) {
        this._value = value
        // this._value = (this.mirthType === 'boolean') ? stringToBoolean(value) : value
        // let val = (this.mirthType === 'boolean') ? stringToBoolean(value) : value
        // if (this.structure === 'array') {
        //     if (typeof val !== this._mirthType) throw new Error(`Expected value to be typeof ${this._mirthType} but typeof value is ${typeof val} for value: "${val}" with name: "${this.name}"`)
        //     this._value[0] = val
        // } else {
        //     this._value[this.key] = val
        // }
        this._isDirty = true
    }

    get isDirty() {
        return this._isDirty
    }

    set isDirty(value) {
        this._isDirty = false
    }

    toJson() {
        if (this.structure === 'array') return [this._value]
        if (this.structure === 'object') return {[this.key]: this._value}
        return this._value
    }
}

module.exports = MirthType

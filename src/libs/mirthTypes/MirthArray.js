const handleValue = (value = []) => (value && value[0] && Array.isArray(value[0].string)) ? value[0].string : value

class MirthArray extends Array {
    constructor(value, arrayType) {
        super(...handleValue(value))
        this._arrayType = arrayType
    }

    get arrayType() {
        return this._arrayType
    }

    set arrayType(value) {
        this._arrayType = value
    }

    toJson() {
        if (this.length === 1 && this[0] === '') return [""]
        return [{[this.arrayType]: [...this]}]
    }
}

module.exports = MirthArray

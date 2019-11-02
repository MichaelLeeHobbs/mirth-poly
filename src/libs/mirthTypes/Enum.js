const MirthType = require('./MirthType')

class Enum extends MirthType {
    constructor({name, value = '', strict = false, allowedValues = []}) {
        super({name, type: 'string', value})
        this._strict = strict
        if (strict && (!allowedValues || allowedValues.length < 0)) throw new Error('If strict is true then allowValues cannot be undefined or empty!')
        this._allowedValues = allowedValues
    }

    get type() {
        return 'enum'
    }

    set value(value) {
        let allowedStr = this._allowedValues.join(', ')
        if (this.strict && this._allowedValues.indexOf(value) < 0) {
            throw new Error(`Strict is true and value "${value}" is not one of (${allowedStr}).`)
        } else if (this._allowedValues.indexOf(value) < 0) {
            console.warn(`MirthEnum "${this.name}" set to value "${value}" which not in the allowed values (${allowedStr}).`)
        }
        this._value[0] = value
    }

    get strict() {
        return this._strict
    }

    set strict(value) {
        this._strict = value
    }
}

module.exports = MirthType

const MirthType = require('./MirthType')

// made string a separate class to avoid circular reference
class MirthBoolean extends MirthType {
    constructor(value) {
        super({value: value.toString() === 'true', type: 'boolean'})
    }
    toJson() {
        return [this._value.toString()]
    }
    set value(value) {
        this.value = value.toString() === 'true'
    }
}
// module.exports = (value) => new MirthType({value, mirthType: 'string'})
module.exports = MirthBoolean

const MirthType = require('./MirthType')

// made string a separate class to avoid circular reference
class MirthString extends MirthType {
    constructor(value) {
        super({value, type: 'string'})
    }
}
// module.exports = (value) => new MirthType({value, mirthType: 'string'})
module.exports = MirthString

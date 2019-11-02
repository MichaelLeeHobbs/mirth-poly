const MirthType = require('./MirthType')
const Enum = require('./Enum')
const Raw = require('./Raw')

module.exports = {
    Boolean: (name, value) => new MirthType({name, value: false, type: 'boolean'}),
    String: (name, value) => new MirthType({name, value, type: 'string'}),
    Number: (name, value) => new MirthType({name, value, type: 'string'}),
    Enum: (name, allowedValues, strict, value) => new Enum({name, allowedValues, value, strict}),
    Raw: (name, value) => new Raw({name, value}),
}

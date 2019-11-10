const MirthType = require('./MirthType')
const MirthString = require('./MirthString')
const MirthBoolean = require('./MirthBoolean')
const Enum = require('./Enum')
const Raw = require('./Raw')
const Date = require('./Date')
const StringArray = require('./StringArray')
const ContextSet = require('./ContextSet')
const Meta = require('./Meta')
const CodeTemplateProperties = require('./CodeTemplateProperties')

module.exports = {
    Boolean: (value) => new MirthBoolean({value}),
    String: (value) => new MirthString({value}),
    Number: (value) => new MirthType({value, type: 'number'}),
    Enum: (allowedValues, strict, value) => new Enum({allowedValues, value, strict}),
    Raw: (value) => new Raw({value}),
    Date: (value, timezone) => new Date({value, timezone}),
    StringArray: (value, debug) => new StringArray({value, debug}),
    ContextSet: (value) => new ContextSet({value}),
    Meta: ({version, mirthClass}) => new Meta({version, mirthClass}),
    CodeTemplateProperties: (value) => new CodeTemplateProperties(value),
}

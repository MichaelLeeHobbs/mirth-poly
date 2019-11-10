const MirthType = require('./MirthType')
const Meta = require('./Meta')
const MirthString = require('./MirthString')
const Script = require('./Script')

class CodeTemplateProperties extends MirthType {
    constructor({$, type, code}) {
        super({type: 'CodeTemplateProperties', structure: 'object'})
        this.$ = new Meta({mirthClass: $['class']})
        this.type = new MirthString({value: type})
        // todo need to figure out filepath for script
        this.code = new Script({code})
    }

    toJson() {
        return [{
            $: this.$.toJson(),
            type: this.type.toJson(),
            code: this.code.toJson()
        }]
    }
}

module.exports = CodeTemplateProperties

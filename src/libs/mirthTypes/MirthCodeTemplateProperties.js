const MirthType = require('./MirthType')
const Meta = require('./MirthMeta')
const MirthString = require('./MirthString')
const Script = require('./MirthScript')

class MirthCodeTemplateProperties extends MirthType {
    // constructor({$, type, code}) {
    constructor(params) {
        // let $ = this.extractParam(params, '$')
        // let type = Array.isArray(params) ? params[0].type : params.type
        // let code = Array.isArray(params) ? params[0].code : params.code

        super({type: 'MirthCodeTemplateProperties', structure: 'object'})
        this.$ = new Meta(this.extractParam(params, '$'))
        this.type = new MirthString(this.extractParam(params, 'type'))
        // todo need to figure out filepath for script
        this.code = new Script({code: this.extractParam(params, 'code')})
    }

    toJson() {
        return [{
            $: this.$.toJson(),
            type: this.type.toJson(),
            code: this.code.toJson()
        }]
    }
}

module.exports = MirthCodeTemplateProperties

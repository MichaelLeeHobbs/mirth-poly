const MirthObject = require('./MirthObject')
const Meta = require('./MirthMeta')
const MirthString = require('./MirthString')
const Raw = require('./MirthRaw')

class MirthAttachmentProperties extends MirthObject {
    constructor({$, type, properties}) {
        super({})
        this.$ = new Meta($)
        this.type = new MirthString(type) // todo maybe enum?
        this.properties = new Raw(properties) // todo need examples
    }

    toJson() {
        return {$: this.$.toJson(), type: this.type.toJson(), properties: [this.properties.toJson()]}
    }
}

module.exports = MirthAttachmentProperties

const MirthObject = require('./mirthTypes/MirthObject')
const {Meta, MirthString, MirthDate,  ContextSet, CodeTemplateProperties} = require('./mirthTypes')

class MirthCodeTemplate extends MirthObject {
    constructor({$, id, name, revision, lastModified, contextSet, properties}) {
        super({})
        this.$ = new Meta($)
        this.id = new MirthString(id)
        this.name = new MirthString(name)
        this.revision = new MirthString(revision)
        this.lastModified = new MirthDate(lastModified)
        this.contextSet = new ContextSet(contextSet[0].delegate[0].contextType)
        this.properties = new CodeTemplateProperties(properties)
    }

    get code() {
        return this.properties.code
    }
    set code(value) {
        this.properties.code = value
    }

    toJson() {
        // todo there is likely a better way to do this
        let {$, id, name, revision, lastModified, contextSet, properties} = this
        return {
            $: $.toJson(),
            id: id.toJson(),
            name: name.toJson(),
            revision: revision.toJson(),
            lastModified: lastModified.toJson(),
            contextSet: contextSet.toJson(),
            properties: properties.toJson(),
        }
    }
}

module.exports = MirthCodeTemplate

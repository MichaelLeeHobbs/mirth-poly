const MirthObject = require('./MirthObject')
const mirthTypes = require('./mirthTypes')

class MirthCodeTemplate extends MirthObject {
    constructor({$: {version}, id, name, revision, lastModified, contextSet, properties, debug}) {
        super({debug})
        this.$ = mirthTypes.Meta({version})
        this.id = mirthTypes.String(id)
        this.name = mirthTypes.String(name)
        this.revision = mirthTypes.String(revision)
        this.lastModified = mirthTypes.Date(lastModified)
        this.contextSet = mirthTypes.ContextSet(contextSet[0].delegate[0].contextType)
        this.properties = mirthTypes.CodeTemplateProperties(properties[0])
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

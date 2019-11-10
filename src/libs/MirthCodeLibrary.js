const MirthObject = require('./MirthObject')
const MirthCodeTemplate = require('./MirthCodeTemplate')
const mirthTypes = require('./mirthTypes')
const xml2js = require('xml2js')

class MirthCodeLibrary extends MirthObject {
    constructor({$: {version}, id, name, revision, lastModified, description, includeNewChannels, enabledChannelIds, disabledChannelIds, codeTemplates, debug = false}) {
        super({debug})
        this.$ = mirthTypes.Meta({version})
        this.id = mirthTypes.String(id)
        this.name = mirthTypes.String(name)
        this.revision = mirthTypes.String(revision)
        this.lastModified = mirthTypes.Date(lastModified)
        this.description = mirthTypes.String(description)
        this.includeNewChannels = mirthTypes.Boolean(includeNewChannels)
        this.enabledChannelIds = mirthTypes.StringArray(enabledChannelIds, debug)
        this.disabledChannelIds = mirthTypes.StringArray(disabledChannelIds, debug)
        this.codeTemplates = []

        /*
        const codeTemplates = [
            {
                codeTemplate: [
                    { MirthCodeTemplate },
                    { MirthCodeTemplate },
                ]
            }
        ]
        */
        // todo need some error checking
        codeTemplates[0].codeTemplate.forEach(codeTemplate => this.codeTemplates.push(new MirthCodeTemplate(codeTemplate)))
    }

    toJson() {
        let {$, id, name, revision, lastModified, description, includeNewChannels, enabledChannelIds, disabledChannelIds, codeTemplates} = this
        let res = {
            $: $.toJson(),
            id: id.toJson(),
            name: name.toJson(),
            revision: revision.toJson(),
            lastModified: lastModified.toJson(),
            description: description.toJson(),
            includeNewChannels: includeNewChannels.toJson(),
            enabledChannelIds: enabledChannelIds.toJson(),
            disabledChannelIds: disabledChannelIds.toJson(),
            codeTemplates: [{codeTemplate: []}],
        }
        codeTemplates.forEach(codeTemplate => res.codeTemplates[0].codeTemplate.push(codeTemplate.toJson()))
        return res
    }
}

module.exports = MirthCodeLibrary

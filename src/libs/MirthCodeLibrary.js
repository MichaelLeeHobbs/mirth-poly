const MirthObject = require('./mirthTypes/MirthObject')
const MirthCodeTemplate = require('./MirthCodeTemplate')
const {Meta, MirthString, MirthDate, MirthBoolean, MirthArray} = require('./mirthTypes')

class MirthCodeLibrary extends MirthObject {
    constructor({$, id, name, revision, lastModified, description, includeNewChannels, enabledChannelIds, disabledChannelIds, codeTemplates}) {
        super({})
        this.$ = new Meta($)
        this.id = new MirthString(id)
        this.name = new MirthString(name)
        this.revision = new MirthString(revision)
        this.lastModified = new MirthDate(lastModified)
        this.description = new MirthString(description)
        this.includeNewChannels = new MirthBoolean(includeNewChannels)
        this.enabledChannelIds = new MirthArray(enabledChannelIds, 'string')
        this.disabledChannelIds = new MirthArray(disabledChannelIds, 'string')
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

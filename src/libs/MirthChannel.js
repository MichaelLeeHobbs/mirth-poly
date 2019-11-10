const MirthObject = require('./mirthTypes/MirthObject')
const MirthChannelProperties = require('./mirthTypes/MirthChannelProperties')
const MirthType = require('./mirthTypes/MirthType')
const mirthTypes = require('./mirthTypes')
const {Meta, MirthString, MirthDate, MirthBoolean, MirthArray, Raw, Script, MirthConnector} = require('./mirthTypes')
const fs = require('fs-extra')


class MirthChannel extends MirthObject {
    constructor({$, id, nextMetaDataId, name, description, revision, sourceConnector, destinationConnectors, preprocessingScript, postprocessingScript, deployScript, undeployScript, properties}) {
        super({})
        this.addProperty('$', Meta, $)
        this.addProperty('id', MirthString, id)
        this.addProperty('nextMetaDataId', MirthString, nextMetaDataId)
        this.addProperty('name', MirthString, name)
        this.addProperty('description', MirthString, description)
        this.addProperty('revision', MirthString, revision)
        this.addProperty('sourceConnector', MirthConnector, sourceConnector, (val)=>[val])

        // todo need class
        this.destinationConnectors = []
        destinationConnectors.forEach(connector=>this.destinationConnectors.push(new Raw(connector)))

        this.addProperty('preprocessingScript', Script, {code: preprocessingScript})
        this.addProperty('postprocessingScript', Script, {code: postprocessingScript})
        this.addProperty('deployScript', Script, {code: deployScript})
        this.addProperty('undeployScript', Script, {code: undeployScript})
        this.addProperty('properties', MirthChannelProperties, properties[0], (val)=>[val])
    }

    toJson() {
        let {$, id, nextMetaDataId, name, description, revision, sourceConnector, preprocessingScript, postprocessingScript, deployScript, undeployScript, properties} = super.toJson()
        return {$, id, nextMetaDataId, name, description, revision, sourceConnector, destinationConnectors: this.destinationConnectors.map(connector=>connector.toJson()), preprocessingScript, postprocessingScript, deployScript, undeployScript, properties}
    }

    writeFileSync({path = './', name = `${this.name}.json`}={}) {
        fs.writeFileSync(`${path}/${name}`, this.toJson(true))
    }
}

module.exports = MirthChannel

const MirthType = require('./MirthType')
const Meta = require('./MirthMeta')
const MirthString = require('./MirthString')
const Raw = require('./MirthRaw')
const MirthBoolean = require('./MirthBoolean')

class MirthConnector extends MirthType {
    // constructor({$, metaDataId, name, properties, transformer, filter, transportName, mode, enabled, waitForPrevious}) {
    constructor(params) {
        super({type: 'object'})
        this.$ = new Meta(this.extractParam(params, '$'))
        this.metaDataId = new MirthString(this.extractParam(params, 'metaDataId'))
        this.name = new MirthString(this.extractParam(params, 'name'))
        this.properties = new Raw(this.extractParam(params, 'properties'))
        this.transformer = new Raw(this.extractParam(params, 'transformer'))
        this.filter = new Raw(this.extractParam(params, 'filter'))
        this.transportName = new MirthString(this.extractParam(params, 'transportName'))
        this.mode = new MirthString(this.extractParam(params, 'mode')) // todo enum
        this.enabled = new MirthBoolean(this.extractParam(params, 'enabled'))
        this.waitForPrevious = new MirthBoolean(this.extractParam(params, 'waitForPrevious'))
    }

    toJson() {
        return {
            $: this.$.toJson(),
            metaDataId: this.metaDataId.toJson(),
            name: this.name.toJson(),
            properties: [this.properties.toJson()],
            transformer: [this.transformer.toJson()],
            filter: [this.filter.toJson()],
            transportName: this.transportName.toJson(),
            mode: this.mode.toJson(),
            enabled: this.enabled.toJson(),
            waitForPrevious: this.waitForPrevious.toJson(),
        }
    }
}

module.exports = MirthConnector

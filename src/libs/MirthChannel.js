const MirthObject = require('./MirthObject')
const MirthChannelProperties = require('./MirthChannelProperties')
const MirthType = require('./mirthTypes/MirthType')
const mirthTypes = require('./mirthTypes')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const xmlBuilder = new xml2js.Builder({headless: true})
const fs = require('fs-extra')


const jsonClone = (val) => JSON.parse(JSON.stringify(val))

class MirthChannel extends MirthObject {
    constructor({xml, json, jsonXml}) {
        super({xml, json, jsonXml})
        // $ is a object holding xml attributes
        // this._version = new MirthType({name: '$', key: 'version', structure: 'object'}) // todo need to think about this one can have both version and class
        this._$ = mirthTypes.Raw('$')
        this._id = mirthTypes.String('id')
        this._nextMetaDataId = mirthTypes.String('nextMetaDataId')
        this._name = mirthTypes.String('name')
        this._description = mirthTypes.String('description')
        this._revision = mirthTypes.String('revision')
        this._sourceConnector = mirthTypes.String('sourceConnector')
        this._destinationConnectors = mirthTypes.String('destinationConnectors')
        this._preprocessingScript = mirthTypes.String('preprocessingScript')
        this._postprocessingScript = mirthTypes.String('postprocessingScript')
        this._deployScript = mirthTypes.String('deployScript')
        this._undeployScript = mirthTypes.String('undeployScript')
        this._properties = undefined //mirthTypes.String('properties')
        if (jsonXml) {
            this.parseXmlJson(jsonXml)
        }
    }
    parseXml(xml) {

    }
    parseJson(json) {}
    parseXmlJson(xjson) {
        // this.version = xjson['$'].version
        this.$ = jsonClone(xjson['$'])
        this.id = xjson.id[0]
        this.nextMetaDataId = xjson.nextMetaDataId[0]
        this.name = xjson.name[0]
        this.description = xjson.description[0]
        this.revision = xjson.revision[0]
        // this.sourceConnector = xjson.sourceConnector[0]
        this.sourceConnector = xjson.sourceConnector
        this.destinationConnectors = xjson.destinationConnectors
        this.preprocessingScript = xjson.preprocessingScript[0]
        this.postprocessingScript = xjson.postprocessingScript[0]
        this.deployScript = xjson.deployScript[0]
        this.undeployScript = xjson.undeployScript[0]
        this.properties = new MirthChannelProperties({xmlJson: xjson.properties[0]})
    }
    toJson(stringify) {
        // let {version, id, nextMetaDataId, name, description, revision, sourceConnector, destinationConnectors, preprocessingScript, postprocessingScript, deployScript, undeployScript, properties} = this
        // return {version, id, nextMetaDataId, name, description, revision, sourceConnector, destinationConnectors, preprocessingScript, postprocessingScript, deployScript, undeployScript, properties}
        let {$, id, nextMetaDataId, name, description, revision, sourceConnector, destinationConnectors, preprocessingScript, postprocessingScript, deployScript, undeployScript} = this
        let res = {$, id, nextMetaDataId, name, description, revision, sourceConnector, destinationConnectors, preprocessingScript, postprocessingScript, deployScript, undeployScript, properties: this.properties.toJson()}
        return (stringify) ? JSON.stringify(res) : res
    }

    toXml() {
        return xmlBuilder.buildObject({channel: this.toJson()})
    }

    writeFileSync({path = './', name = `${this.name}.json`}={}) {
        fs.writeFileSync(`${path}/${name}`, this.toJson(true))
    }

    get $() {
        return this._$.value
    }

    set $(value) {
        this._$.value = value
    }

    // get version() {
    //     return this._version.value
    // }
    //
    // set version(value) {
    //     this._version.value = value
    // }

    get id() {
        return this._id.value
    }

    set id(value) {
        this._id.value = value
    }

    get nextMetaDataId() {
        return this._nextMetaDataId.value
    }

    set nextMetaDataId(value) {
        this._nextMetaDataId.value = value
    }

    get name() {
        return this._name.value
    }

    set name(value) {
        this._name.value = value
    }

    get description() {
        return this._description.value
    }

    set description(value) {
        this._description.value = value
    }

    get revision() {
        return this._revision.value
    }

    set revision(value) {
        this._revision.value = value
    }

    get sourceConnector() {
        return this._sourceConnector
    }

    set sourceConnector(value) {
        this._sourceConnector = value
    }

    get destinationConnectors() {
        return this._destinationConnectors
    }

    set destinationConnectors(value) {
        this._destinationConnectors = value
    }

    get preprocessingScript() {
        return this._preprocessingScript
    }

    set preprocessingScript(value) {
        this._preprocessingScript = value
    }

    get postprocessingScript() {
        return this._postprocessingScript
    }

    set postprocessingScript(value) {
        this._postprocessingScript = value
    }

    get deployScript() {
        return this._deployScript
    }

    set deployScript(value) {
        this._deployScript = value
    }

    get undeployScript() {
        return this._undeployScript
    }

    set undeployScript(value) {
        this._undeployScript = value
    }

    get properties() {
        return this._properties
    }

    set properties(value) {
        this._properties = value
    }
}

module.exports = MirthChannel

const MirthObject = require('./MirthObject')
const MirthType = require('./mirthTypes/MirthType')
const mirthTypes = require('./mirthTypes')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const jsonClone = (val) => JSON.parse(JSON.stringify(val))

class MirthChannelProperties extends MirthObject {
    constructor({xml, json, xmlJson}) {
        super({xml, json, xmlJson})
        // this._version = new MirthType({name: '$', key: 'version', structure: 'object'}) // todo need to think about this one can have both version and class
        this._$ = mirthTypes.Raw('$')
        this._clearGlobalChannelMap = mirthTypes.Boolean('clearGlobalChannelMap')
        this._messageStorageMode = mirthTypes.String('messageStorageMode')
        this._encryptData = mirthTypes.Boolean('encryptData')
        this._removeContentOnCompletion = mirthTypes.Boolean('removeContentOnCompletion')
        this._removeOnlyFilteredOnCompletion = mirthTypes.Boolean('removeOnlyFilteredOnCompletion')
        this._removeAttachmentsOnCompletion = mirthTypes.Boolean('removeAttachmentsOnCompletion')
        this._initialState = mirthTypes.Enum('initialState', ['STARTED', 'STOPPED', 'PAUSED', false])
        this._storeAttachments = mirthTypes.Boolean('storeAttachments')
        this._metaDataColumns = mirthTypes.Raw('metaDataColumns') // TODO these are a bit more complex but not sure how to handle yet ie type/class maybe MirthTypeArray?
        this._attachmentProperties = mirthTypes.Raw('attachmentProperties') // TODO these more complex and need to be researched
        this._resourceIds = mirthTypes.Raw('resourceIds') // TODO no idea - research, maybe dependencies/library resources
        if (xmlJson) this.parseXmlJson(xmlJson)
    }

    parseXml(xml) {

    }

    parseJson(json) {
    }

    parseXmlJson(xjson) {
        console.log('xjson', xjson)
        // this.version = xjson['$'].version
        this.$ = jsonClone(xjson['$'])
        this.clearGlobalChannelMap = xjson.clearGlobalChannelMap[0]
        this.messageStorageMode = xjson.messageStorageMode[0]
        this.encryptData = xjson.encryptData[0]
        this.removeContentOnCompletion = xjson.removeContentOnCompletion[0]
        this.removeOnlyFilteredOnCompletion = xjson.removeOnlyFilteredOnCompletion[0]
        this.removeAttachmentsOnCompletion = xjson.removeAttachmentsOnCompletion[0]
        this.initialState = xjson.initialState[0]
        this.storeAttachments = xjson.storeAttachments[0]
        this.metaDataColumns = xjson.metaDataColumns
        this.attachmentProperties = xjson.attachmentProperties
        this.resourceIds = xjson.resourceIds
    }

    toXml() {
    }

    toJson(stringify) {
        let {$, clearGlobalChannelMap, messageStorageMode, encryptData, removeContentOnCompletion, removeOnlyFilteredOnCompletion, removeAttachmentsOnCompletion, initialState, storeAttachments, metaDataColumns, attachmentProperties, resourceIds} = this
        let res = {$, clearGlobalChannelMap, messageStorageMode, encryptData, removeContentOnCompletion, removeOnlyFilteredOnCompletion, removeAttachmentsOnCompletion, initialState, storeAttachments, metaDataColumns, attachmentProperties, resourceIds}
        return (stringify) ? JSON.stringify(res) : res
    }

    get $() {
        return this._$.value
    }

    set $(value) {
        this._$.value = value
    }

    // get version() {
    //     return this._version
    // }
    //
    // set version(value) {
    //     this._version = value
    // }

    get clearGlobalChannelMap() {
        return this._clearGlobalChannelMap
    }

    set clearGlobalChannelMap(value) {
        this._clearGlobalChannelMap = value
    }

    get messageStorageMode() {
        return this._messageStorageMode
    }

    set messageStorageMode(value) {
        this._messageStorageMode = value
    }

    get encryptData() {
        return this._encryptData
    }

    set encryptData(value) {
        this._encryptData = value
    }

    get removeContentOnCompletion() {
        return this._removeContentOnCompletion
    }

    set removeContentOnCompletion(value) {
        this._removeContentOnCompletion = value
    }

    get removeOnlyFilteredOnCompletion() {
        return this._removeOnlyFilteredOnCompletion
    }

    set removeOnlyFilteredOnCompletion(value) {
        this._removeOnlyFilteredOnCompletion = value
    }

    get removeAttachmentsOnCompletion() {
        return this._removeAttachmentsOnCompletion
    }

    set removeAttachmentsOnCompletion(value) {
        this._removeAttachmentsOnCompletion = value
    }

    get initialState() {
        return this._initialState
    }

    set initialState(value) {
        this._initialState = value
    }

    get storeAttachments() {
        return this._storeAttachments
    }

    set storeAttachments(value) {
        this._storeAttachments = value
    }

    get metaDataColumns() {
        return this._metaDataColumns
    }

    set metaDataColumns(value) {
        this._metaDataColumns = value
    }

    get attachmentProperties() {
        return this._attachmentProperties
    }

    set attachmentProperties(value) {
        this._attachmentProperties = value
    }

    get resourceIds() {
        return this._resourceIds
    }

    set resourceIds(value) {
        this._resourceIds = value
    }
}

module.exports = MirthChannelProperties

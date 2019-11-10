const MirthObject = require('./MirthObject')
const Meta = require('./MirthMeta')
const MirthBoolean = require('./MirthBoolean')
const MirthString = require('./MirthString')
const AttachmentProperties = require('./MirthAttachmentProperties')
const ResourceIds = require('./MirthResourceIds')
const MetaDataColumn = require('./MetaDataColumn')
const Enum = require('./MirthEnum')

class MirthChannelProperties extends MirthObject {
    constructor({$, clearGlobalChannelMap, messageStorageMode, encryptData, removeContentOnCompletion, removeOnlyFilteredOnCompletion, removeAttachmentsOnCompletion, initialState, storeAttachments, metaDataColumns, attachmentProperties, resourceIds}) {
        super({})
        this.$ = new Meta($)
        this.clearGlobalChannelMap = new MirthBoolean(clearGlobalChannelMap)
        this.messageStorageMode = new MirthString(messageStorageMode)
        this.encryptData = new MirthBoolean(encryptData)
        this.removeContentOnCompletion = new MirthBoolean(removeContentOnCompletion)
        this.removeOnlyFilteredOnCompletion = new MirthBoolean(removeOnlyFilteredOnCompletion)
        this.removeAttachmentsOnCompletion = new MirthBoolean(removeAttachmentsOnCompletion)
        this.initialState = new Enum({value: initialState, allowedValues: ['STARTED', 'STOPPED', 'PAUSED'], strict: false}) // todo check / refactor
        this.storeAttachments = new MirthBoolean(storeAttachments)
        this.metaDataColumns = []
        metaDataColumns[0].metaDataColumn.forEach(column => this.metaDataColumns.push(new MetaDataColumn(column)))

        this.attachmentProperties = new AttachmentProperties(attachmentProperties[0])
        this.resourceIds = new ResourceIds(resourceIds[0])
    }

    toJson() {
        return {
            $: this.$.toJson(),
            clearGlobalChannelMap: this.clearGlobalChannelMap.toJson(),
            messageStorageMode: this.messageStorageMode.toJson(),
            encryptData: this.encryptData.toJson(),
            removeContentOnCompletion: this.removeContentOnCompletion.toJson(),
            removeOnlyFilteredOnCompletion: this.removeOnlyFilteredOnCompletion.toJson(),
            removeAttachmentsOnCompletion: this.removeAttachmentsOnCompletion.toJson(),
            initialState: this.initialState.toJson(),
            storeAttachments: this.storeAttachments.toJson(),
            metaDataColumns: [{metaDataColumn: this.metaDataColumns.map(column => column.toJson())}],
            attachmentProperties: [this.attachmentProperties.toJson()],
            resourceIds: [this.resourceIds.toJson()],
        }
    }
}

module.exports = MirthChannelProperties

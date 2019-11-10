const MirthType = require('./MirthType')

const CONTEXT_TYPES = [
    "DESTINATION_RESPONSE_TRANSFORMER",
    "CHANNEL_BATCH",
    "CHANNEL_PREPROCESSOR",
    "GLOBAL_POSTPROCESSOR",
    "SOURCE_FILTER_TRANSFORMER",
    "CHANNEL_DEPLOY",
    "SOURCE_RECEIVER",
    "DESTINATION_FILTER_TRANSFORMER",
    "GLOBAL_UNDEPLOY",
    "GLOBAL_PREPROCESSOR",
    "CHANNEL_UNDEPLOY",
    "DESTINATION_DISPATCHER",
    "CHANNEL_ATTACHMENT",
    "GLOBAL_DEPLOY",
    "CHANNEL_POSTPROCESSOR"
]

class MirthContextSet extends MirthType {
    constructor(contextType) {
        super({type: 'object'})
        this._DESTINATION_RESPONSE_TRANSFORMER = false
        this._CHANNEL_BATCH = false
        this._CHANNEL_PREPROCESSOR = false
        this._GLOBAL_POSTPROCESSOR = false
        this._SOURCE_FILTER_TRANSFORMER = false
        this._CHANNEL_DEPLOY = false
        this._SOURCE_RECEIVER = false
        this._DESTINATION_FILTER_TRANSFORMER = false
        this._GLOBAL_UNDEPLOY = false
        this._GLOBAL_PREPROCESSOR = false
        this._CHANNEL_UNDEPLOY = false
        this._DESTINATION_DISPATCHER = false
        this._CHANNEL_ATTACHMENT = false
        this._GLOBAL_DEPLOY = false
        this._CHANNEL_POSTPROCESSOR = false
        this._parseArray(contextType)
    }

    _parseArray(arr) {
        try {
            arr = arr[0].delegate[0].contextType
        } catch (e) {/* do nothing */ }
        if (!Array.isArray(arr)) throw new Error(`ContextSet.constructor(value) - expected value to be Array or contextSet ie "contextSet[0].delegate[0].contextType" with value = contextSet`)
        arr.forEach(ele=>{
            if (CONTEXT_TYPES.indexOf(ele) === -1) throw new Error(`Unknown contextType: "${ele}"`)
            this[ele] = true
        })
    }

    get DESTINATION_RESPONSE_TRANSFORMER() {
        return this._DESTINATION_RESPONSE_TRANSFORMER
    }

    set DESTINATION_RESPONSE_TRANSFORMER(value) {
        this._DESTINATION_RESPONSE_TRANSFORMER = value
    }

    get CHANNEL_BATCH() {
        return this._CHANNEL_BATCH
    }

    set CHANNEL_BATCH(value) {
        this._CHANNEL_BATCH = value
    }

    get CHANNEL_PREPROCESSOR() {
        return this._CHANNEL_PREPROCESSOR
    }

    set CHANNEL_PREPROCESSOR(value) {
        this._CHANNEL_PREPROCESSOR = value
    }

    get GLOBAL_POSTPROCESSOR() {
        return this._GLOBAL_POSTPROCESSOR
    }

    set GLOBAL_POSTPROCESSOR(value) {
        this._GLOBAL_POSTPROCESSOR = value
    }

    get SOURCE_FILTER_TRANSFORMER() {
        return this._SOURCE_FILTER_TRANSFORMER
    }

    set SOURCE_FILTER_TRANSFORMER(value) {
        this._SOURCE_FILTER_TRANSFORMER = value
    }

    get CHANNEL_DEPLOY() {
        return this._CHANNEL_DEPLOY
    }

    set CHANNEL_DEPLOY(value) {
        this._CHANNEL_DEPLOY = value
    }

    get SOURCE_RECEIVER() {
        return this._SOURCE_RECEIVER
    }

    set SOURCE_RECEIVER(value) {
        this._SOURCE_RECEIVER = value
    }

    get DESTINATION_FILTER_TRANSFORMER() {
        return this._DESTINATION_FILTER_TRANSFORMER
    }

    set DESTINATION_FILTER_TRANSFORMER(value) {
        this._DESTINATION_FILTER_TRANSFORMER = value
    }

    get GLOBAL_UNDEPLOY() {
        return this._GLOBAL_UNDEPLOY
    }

    set GLOBAL_UNDEPLOY(value) {
        this._GLOBAL_UNDEPLOY = value
    }

    get GLOBAL_PREPROCESSOR() {
        return this._GLOBAL_PREPROCESSOR
    }

    set GLOBAL_PREPROCESSOR(value) {
        this._GLOBAL_PREPROCESSOR = value
    }

    get CHANNEL_UNDEPLOY() {
        return this._CHANNEL_UNDEPLOY
    }

    set CHANNEL_UNDEPLOY(value) {
        this._CHANNEL_UNDEPLOY = value
    }

    get DESTINATION_DISPATCHER() {
        return this._DESTINATION_DISPATCHER
    }

    set DESTINATION_DISPATCHER(value) {
        this._DESTINATION_DISPATCHER = value
    }

    get CHANNEL_ATTACHMENT() {
        return this._CHANNEL_ATTACHMENT
    }

    set CHANNEL_ATTACHMENT(value) {
        this._CHANNEL_ATTACHMENT = value
    }

    get GLOBAL_DEPLOY() {
        return this._GLOBAL_DEPLOY
    }

    set GLOBAL_DEPLOY(value) {
        this._GLOBAL_DEPLOY = value
    }

    get CHANNEL_POSTPROCESSOR() {
        return this._CHANNEL_POSTPROCESSOR
    }

    set CHANNEL_POSTPROCESSOR(value) {
        this._CHANNEL_POSTPROCESSOR = value
    }

    set value(value) {
        // todo console.warn('You can not set the value of a MirthContextSet. Use normal array methods to alter the MirthContextSet. Example: MirthContextSet.value[1] = "a" or MirthContextSet.value.push(3)')
    }

    get type() {
        return 'MirthContextSet'
    }

    toJson() {
        let contextType = []
        CONTEXT_TYPES.forEach(cType => {
            if (this[cType]) contextType.push(cType)
        })
        return [{
            delegate: [
                {contextType}
            ]
        }]
    }
}

module.exports = MirthContextSet

const MirthType = require('./MirthType')
const MirthString = require('./MirthString')

class MetaDataColumn extends MirthType {
    constructor(params) {
        super({type: 'object'})
        this.name = new MirthString(this.extractParam(params, 'name'))
        this.type = new MirthString(this.extractParam(params, 'type')) // todo maybe enum?
        this.mappingName = new MirthString(this.extractParam(params, 'mappingName'))
    }

    toJson() {
        return {name: this.name.toJson(), type: this.type.toJson(), mappingName: this.mappingName.toJson()}
    }
}

module.exports = MetaDataColumn

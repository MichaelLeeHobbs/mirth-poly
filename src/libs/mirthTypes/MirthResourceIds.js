const MirthObject = require('./MirthObject')
const Meta = require('./MirthMeta')
const MirthArray = require('./MirthArray')

class MirthResourceIds extends MirthObject {
    constructor({$, entry}) {
        super({})
        this.$ = new Meta($)
        this.entry = new MirthArray(entry, 'string')
    }

    toJson() {
        return {$: this.$.toJson(), entry: this.entry.toJson()}
    }
}

module.exports = MirthResourceIds

const MirthType = require('./MirthType')
const xml2js = require('xml2js')
const xmlBuilder = new xml2js.Builder()

class MirthRaw extends MirthType {
    constructor(value) {
        super({type: 'raw', value, structure: 'raw'})
        // console.warn(new Error('TODO! Replace RAW TYPE!'))
    }
}

module.exports = MirthRaw

const MirthType = require('./MirthType')

class MirthDate extends MirthType {
    // constructor({value = (new Date()).valueOf(), timezone = 'GMT'}) {
    constructor(time, timezone) {
        super({type: 'date'})
        try {
            time = time[0].time[0]
        } catch (e) {
            time = (new Date()).valueOf()
        }
        try {
            timezone = timezone ? timezone[0].timezone[0] : time[0].timezone[0]
        } catch (e) {
            timezone = 'GMT'
        }
        //time = Array.isArray(value) && value[0] && Array.isArray(value[0].time) && value[0].time[0] ? value[0].time[0] : time
        this._value = time
        this._timezone = timezone
    }

    get timezone() {
        return this._timezone
    }

    set timezone(value) {
        this._timezone = value
    }

    toJson(stringify) {
        let res = [{time: [this.value.toString()], timezone: [this.timezone]}]
        return (stringify) ? JSON.stringify(res) : res
    }
}

module.exports = MirthDate

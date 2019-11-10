const handleValue = (value = []) => (value && value[0] && Array.isArray(value[0].string)) ? value[0].string : value

class StringArray extends Array {
    constructor({value, debug = false}) {
        super(...handleValue(value))
    }

    toJson() {
        if (this.length === 1 && this[0] === '') return [""]
        return [{string: [...this]}]
    }
}

module.exports = StringArray

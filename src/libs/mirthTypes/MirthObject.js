class MirthObject {
    constructor(parent, path) {
        this._properties = new Map()
        this._parent = parent
        this._path = path
    }

    get parent() {
        return this._parent
    }

    get path() {
        return this._path
    }

    set path(value) {
        this._path = value
    }

    addProperty(key, MirthClass, value, toJson) {
        this[key] = new MirthClass(value)
        this._properties.set(key, {toJson})
    }

    toJson() {
        let res = {}
        this._properties.forEach(({toJson}, k)=>{
            res[k] = toJson ? toJson(this[k].toJson()) : this[k].toJson()
        })
        return res
    }
}

module.exports = MirthObject

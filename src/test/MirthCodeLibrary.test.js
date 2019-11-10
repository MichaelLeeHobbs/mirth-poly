const fs = require('fs-extra')
const MirthCodeLibrary = require('../libs/MirthCodeLibrary')
const mirthCodeLibrariesJson = require('../../mirthSrc/CodeTemplates.json')


let mirthCodeLibraries = []
mirthCodeLibrariesJson.forEach((library)=>mirthCodeLibraries.push(new MirthCodeLibrary(library)))

let expectedStr = JSON.stringify(mirthCodeLibrariesJson, null, 2)
let testJson = []
mirthCodeLibraries.forEach(lib=>testJson.push(lib.toJson()))
let testStr = JSON.stringify(testJson, null, 2)

// we compare length because mirthCodeLibrariesJson[*].codeTemplates[0].codeTemplate[*].contextSet[0].delegate[0].contextType[...] order is not stable in mirth xml but is stable in mirthTypes.CodeTemplateProperties
console.log(`expectedStr.length === testStr.length is: ${expectedStr.length === testStr.length}`)
fs.writeFileSync('./src/test/expected.json', expectedStr)
fs.writeFileSync('./src/test/actual.json', testStr)

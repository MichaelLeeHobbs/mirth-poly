const fs = require('fs-extra')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

const processCodeTemplateLibraries = async ({codeTemplateLibrary, codeTemplateFile='CodeTemplates.xml', outpath}={}) => {
    if (!codeTemplateLibrary) {
        let codeTemplatesText = fs.readFileSync(codeTemplateFile)
        codeTemplateLibrary = await xmlParser.parseStringPromise(codeTemplatesText).then(res => res.list.codeTemplateLibrary)
    }

    let runOnce = true
    codeTemplateLibrary.forEach(ctLib => {
        let ctlName = ctLib.name[0]
        let ctlPath = `${outpath}/codeTemplateLibrary/${ctlName}`
        fs.ensureDirSync(ctlPath)
        ctLib.codeTemplates[0].codeTemplate.forEach((lib) => {
            let ctlLibPath = `${ctlPath}/${lib.name}`
            // fs.ensureDirSync(crlLibPath)
            fs.writeFileSync(ctlLibPath, lib.properties[0].code)
            lib.properties[0].code = `require(${ctlLibPath})`
            fs.writeFileSync(`${ctlLibPath}.json`, JSON.stringify(lib, null, 2))
        })
        if (runOnce) {
            console.log(JSON.stringify(ctLib, null, 2))
            // runOnce = false
        }

    })
    //console.log(JSON.stringify(codeTemplateLibrary, null, 2))
}

module.exports = processCodeTemplateLibraries

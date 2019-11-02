const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const fs = require('fs-extra')

const getCodeTemplateLibraries = async ({mirthClient, outfile='CodeTemplates.xml', outpath}) => {
    // let mirthClient = await new MirthApi({host: '10.100.96.61', port: '8443', username: MIRTH_USER, password: MIRTH_PASSWORD, disableTLSCheck: true})
    //     .catch((e) => console.error('Login FAILED!', e))

    let res = await mirthClient.CodeTemplates.getCodeTemplateLibraries({includeCodeTemplates: true})
    let json = (await xmlParser.parseStringPromise(res.text)).list.codeTemplateLibrary
    fs.writeFileSync(`${outpath}/${outfile}`, res.text)
    fs.writeFileSync(`${outpath}/${outfile.replace('xml', 'json')}`, JSON.stringify(json, null, 2))
    return json
}

module.exports = getCodeTemplateLibraries

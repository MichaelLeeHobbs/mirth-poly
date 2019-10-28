const MirthApi = require('mirth-api')
// const Swagger = require('swagger-client')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const fs = require('fs-extra')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
const changeCase = require('change-case')

const MIRTH_USER = 'admin'
const MIRTH_PASSWORD = 'admin'

let cookies = ''

const $js = (json) => JSON.stringify(json, null, 2)
const $jp = (json) => console.log($js(json))

const testMirthApi = async () => {
    let mirthClient = await new MirthApi({host: '10.100.96.61', port: '8443', username: MIRTH_USER, password: MIRTH_PASSWORD, disableTLSCheck: true})
        .catch((e) => console.error('Login FAILED!', e))
    console.log('cookie', mirthClient.cookie)
    console.log('getCurrentUser: ', await mirthClient.Users.getCurrentUser())
    console.log('createUser: ', await mirthClient.Users.createUser({body: `<user><username>test</username></user>`}).catch(console.error))


}

const getCodeTemplateLibraries = async () => {
    let mirthClient = await new MirthApi({host: '10.100.96.61', port: '8443', username: MIRTH_USER, password: MIRTH_PASSWORD, disableTLSCheck: true})
        .catch((e) => console.error('Login FAILED!', e))

    let res = await mirthClient.CodeTemplates.getCodeTemplateLibraries({includeCodeTemplates: true})
    fs.writeFileSync('CodeTemplates.xml', res.text)
    let codeTemplateLibrary = await xmlParser.parseStringPromise(res.text).then(res => res.list.codeTemplateLibrary)
}


const processCodeTemplateLibraries = async () => {
    let codeTemplatesText = fs.readFileSync('CodeTemplates.xml')
    let codeTemplateLibrary = await xmlParser.parseStringPromise(codeTemplatesText).then(res => res.list.codeTemplateLibrary)

    let runOnce = true
    codeTemplateLibrary.forEach(ctLib => {
        let ctlName = ctLib.name[0]
        let ctlPath = `./codeTemplateLibrary/${ctlName}`
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
const getChannels = async () => {
    let mirthClient = await new MirthApi({host: '10.100.96.61', port: '8443', username: MIRTH_USER, password: MIRTH_PASSWORD, disableTLSCheck: true})
        .catch((e) => console.error('Login FAILED!', e))

    let res = await mirthClient.Channels.getChannels()
    fs.writeFileSync('Channels.xml', res.text)
}
const processChannels = async () => {
    const JS_TRANSFORMER_STEP = 'com.mirth.connect.plugins.javascriptstep.JavaScriptStep'

    let channelsText = fs.readFileSync('Channels.xml')
    let channels = await xmlParser.parseStringPromise(channelsText).then(res => res.list.channel)

    let transformerType = Object.keys(channels[1].sourceConnector[0].transformer[0].elements[0])[0]


    // console.log(codeTemplateLibrary[0].codeTemplates[0])
    // console.log(codeTemplateLibrary[0].codeTemplates[0].codeTemplate[0].properties[0].code)
    //
    // let runOnce = true
    channels.forEach(channel => {
        let channelName = channel.name[0]
        let channelPath = `./channels/${channelName}`
        let transformerTypes = Object.keys(channel.sourceConnector[0].transformer[0].elements[0])
        fs.ensureDirSync(`${channelPath}/sourceConnector/transformers`)
        fs.ensureDirSync(`${channelPath}/destinationConnectors`)

        // sourceConnector transformers
        let sourceTransformers = channel.sourceConnector[0].transformer[0].elements[0]
        transformerTypes.forEach(transformerType => {
            sourceTransformers[transformerType].forEach(transformer => {
                let transformerName = transformer.name && transformer.name[0] ? `${transformer.name[0]}.js` : `step.${transformer.sequenceNumber[0]}.js`
                let transformerPath = `${channelPath}/sourceConnector/transformers/${transformerName}`
                if (transformer.script && transformer.script[0]) {
                    fs.writeFileSync(transformerPath, transformer.script[0])
                    transformer.script[0] = `require('${transformerPath}')`
                }

                // $jp(transformer)
            })
        })
        let transformersSettingsPath = `${channelPath}/sourceConnector/transformers/transformers.json`
        fs.writeFileSync(transformersSettingsPath, $js(channel.sourceConnector[0].transformer))
        channel.sourceConnector[0].transformer = `require('${transformersSettingsPath}')`

        let sourceConnectorSettingsPath = `${channelPath}/sourceConnector/sourceConnector.json`
        fs.writeFileSync(sourceConnectorSettingsPath, $js(channel.sourceConnector))
        channel.sourceConnector = `require('${sourceConnectorSettingsPath}')`


        // destinationConnectors
        let connectors = channel.destinationConnectors[0].connector
        connectors.forEach(connector => {
            let destinationName = connector.name[0]
            let elements = connector.transformer[0].elements
            let path = `${channelPath}/destinationConnectors/${destinationName}/transformers`.replace(/[:]/g, '.')
            fs.ensureDirSync(path)

            elements.forEach(element => {
                $jp(element)
                if (element[JS_TRANSFORMER_STEP]) {
                    element[JS_TRANSFORMER_STEP].forEach(step => {
                        let script = step.script[0]
                        let name = step.name && step.name[0] ? `${step.name[0]}.js` : `step.${step.sequenceNumber[0]}.js`
                        // console.log('writing', `${path}/${name}`)
                        fs.writeFileSync(`${path}/${name}`, script)
                        step.script[0] = `require('${path}/${name}')`
                    })
                }
            })
            fs.writeFileSync(`${path}/transformers.json`, $js(connector))
        })

        // preprocessingScript
        let preprocessingScriptPath = `${channelPath}/preprocessingScript.js`
        fs.writeFileSync(preprocessingScriptPath, channel.preprocessingScript[0])
        channel.preprocessingScript[0] = `require(${preprocessingScriptPath})`

        // postprocessingScript
        let postprocessingScriptPath = `${channelPath}/postprocessingScript.js`
        fs.writeFileSync(postprocessingScriptPath, channel.postprocessingScript[0])
        channel.postprocessingScript[0] = `require(${postprocessingScriptPath})`

        // deployScript
        let deployScriptPath = `${channelPath}/deployScript.js`
        fs.writeFileSync(deployScriptPath, channel.deployScript[0])
        channel.deployScript[0] = `require(${deployScriptPath})`

        // undeployScript
        let undeployScriptPath = `${channelPath}/undeployScript.js`
        fs.writeFileSync(undeployScriptPath, channel.undeployScript[0])
        channel.undeployScript[0] = `require(${undeployScriptPath})`

        // channelSettings
        let channelSettingsPath = `${channelPath}/channel.json`
        fs.writeFileSync(channelSettingsPath, $js(channel))

        // console.log(transformerType)


        // ctLib.codeTemplates[0].codeTemplate.forEach((lib) => {
        //     let ctlLibPath = `${ctlPath}/${lib.name}`
        //     // fs.ensureDirSync(crlLibPath)
        //     fs.writeFileSync(ctlLibPath, lib.properties[0].code)
        //     lib.properties[0].code = `require(${ctlLibPath})`
        //     fs.writeFileSync(`${ctlLibPath}.json`, JSON.stringify(lib,null,2))
        // })
        // if (runOnce) {
        //     console.log(JSON.stringify(ctLib, null, 2))
        //     // runOnce = false
        // }

    })
    fs.writeFileSync('channels.json', $js(channels))
    //console.log(JSON.stringify(codeTemplateLibrary, null, 2))
}
// getCodeTemplateLibraries()
// processCodeTemplateLibraries()
// getChannels()
// processChannels()
testMirthApi()

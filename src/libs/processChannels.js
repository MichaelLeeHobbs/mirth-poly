const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const fs = require('fs-extra')

const $js = (json) => JSON.stringify(json, null, 2)
const $jp = (json) => console.log($js(json))

const processChannels = async ({channels, channelsFile='Channels.xml', outpath}={}) => {
    const JS_TRANSFORMER_STEP = 'com.mirth.connect.plugins.javascriptstep.JavaScriptStep'

    if (!channels) {
        let channelsText = fs.readFileSync(channelsFile)
        channels = await xmlParser.parseStringPromise(channelsText).then(res => res.list.channel)
    }

    let transformerType = Object.keys(channels[1].sourceConnector[0].transformer[0].elements[0])[0]


    // console.log(codeTemplateLibrary[0].codeTemplates[0])
    // console.log(codeTemplateLibrary[0].codeTemplates[0].codeTemplate[0].properties[0].code)
    //
    // let runOnce = true
    channels.forEach(channel => {
        let channelName = channel.name[0]
        let channelPath = `${outpath}/channels/${channelName}`
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
    fs.writeFileSync(`${outpath}/channels/channels.json`, $js(channels))
    //console.log(JSON.stringify(codeTemplateLibrary, null, 2))
}

module.exports = processChannels

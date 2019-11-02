#! /usr/bin/env node
const yargs = require("yargs")
const fs = require('fs-extra')


const MirthApi = require('mirth-api')
const getCodeTemplateLibraries = require('./libs/getCodeTemplateLibraries')
const processCodeTemplateLibraries = require('./libs/processCodeTemplateLibraries')
const getChannels = require('./libs/getChannels')
const processChannels = require('./libs/processChannels')

const options = yargs
    .usage("Usage: --username <mirthUserName> --password <mirthUserPassword>")
    .example(`Example: 'mirth-poly --username admin --password admin --host 10.100.96.61 --port 8443 --notls'`)
    .option("u", {alias: "username", describe: "Mirth User Name", type: "string", demandOption: true})
    .option("p", {alias: "password", describe: "Mirth User Password", type: "string", demandOption: true})
    .option("h", {alias: "host", describe: "Mirth Host", type: "string", demandOption: false, default: '127.0.0.1'})
    .option("o", {alias: "port", describe: "Mirth Port", type: "string", demandOption: false, default: '8443'})
    .option("n", {alias: "notls", describe: "Disable TLS Check - required for self signed untrusted cert", type: "boolean", demandOption: false, default: false})
    .option("d", {alias: "outpath", describe: "Path to write files to", type: "string", demandOption: false, default: './mirthSrc'})
    .argv

let {username, password, host, port, notls: disableTLSCheck, outpath} = options

async function main() {
    let mirthClient
    try {
        mirthClient = await new MirthApi({host, port, username, password, disableTLSCheck})
    } catch (e) {
        console.error('Login FAILED!')
        throw e
    }
    fs.ensureDirSync(outpath)

    let codeTemplateLibrary = await getCodeTemplateLibraries({mirthClient, outpath})
    await processCodeTemplateLibraries({codeTemplateLibrary, outpath})
    let channels = await getChannels({mirthClient, outpath})
    await processChannels({channels, outpath})
}

main()


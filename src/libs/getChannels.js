const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()
const fs = require('fs-extra')

const getChannels = async ({mirthClient, outfile='Channels.xml', outpath}) => {
    // let mirthClient = await new MirthApi({host: '10.100.96.61', port: '8443', username: MIRTH_USER, password: MIRTH_PASSWORD, disableTLSCheck: true})
    //     .catch((e) => console.error('Login FAILED!', e))

    let res = await mirthClient.Channels.getChannels()
    fs.writeFileSync(`${outpath}/${outfile}`, res.text)
    return await xmlParser.parseStringPromise(res.text).then(res => res.list.channel)
}

module.exports = getChannels

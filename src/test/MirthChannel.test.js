const fs = require('fs-extra')
const MirthChannel = require('../libs/MirthChannel')
const mirthChannelsJson = require('../../mirthSrc/Channels.json')
fs.ensureDirSync('./src/test/results/channels/')
let mirthChannels = []
let failures = []
mirthChannelsJson.forEach((channel, i)=>{
    console.log(`Processing channel #${i}`)
    mirthChannels.push(new MirthChannel(channel))

    let expected = JSON.stringify(channel, null, 2)
    let actual = JSON.stringify(new MirthChannel(channel).toJson(), null, 2)

    fs.writeFileSync(`./src/test/results/channels/${i}.expected.channel.json`, expected)
    fs.writeFileSync(`./src/test/results/channels/${i}.actual.channel.json`, actual)

    if (expected.length !== actual.length) {
        failures.push(`Channel ${i} failed!`)
    }
})

console.log('Results: ', JSON.stringify(failures, null, 2))








// let jsonXml = channels.find(ele=>ele.name[0]==='testing')
// // console.log('jsonXml', JSON.stringify(jsonXml,null,2))
// let mirthChannel = new MirthChannel({jsonXml, debug: true})
//
// // console.log(JSON.stringify(mirthChannel,null,2))
// console.log(JSON.stringify(mirthChannel.toJson(),null,2))
// mirthChannel.writeFileSync()
// console.log(mirthChannel.toXml())

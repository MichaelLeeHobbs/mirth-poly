const MirthChannel = require('./libs/MirthChannel')
const channels = require('../mirthSrc/Channels.json')

let jsonXml = channels.find(ele=>ele.name[0]==='testing')
// console.log('jsonXml', JSON.stringify(jsonXml,null,2))
let mirthChannel = new MirthChannel({jsonXml})

// console.log(JSON.stringify(mirthChannel,null,2))
console.log(JSON.stringify(mirthChannel.toJson(),null,2))
mirthChannel.writeFileSync()
console.log(mirthChannel.toXml())

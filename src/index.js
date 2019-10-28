#! /usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const csv = require('csvtojson')
const yargs = require("yargs")
const fetch = require('node-fetch')

// const options = yargs
//     .usage("Usage: --input <input.csv> --outpath <outputPath>")
//     .example(`Example: 'trgaudit --files 2016dates.csv --outpath ./out/2016'`)
//     .option("i", {alias: "input", describe: "Input csv", type: "string", demandOption: true})
//     .option("o", {
//         alias: "outpath",
//         describe: `Output path for where to write the output csv files`,
//         type: "string",
//         demandOption: true
//     })
//     .argv
//
//
// const input = path.resolve(process.cwd(), options.input)
//
// const writeCSVFile = (fileName, data) => {
//     let out = 'accession_number,dt,study_id,modality,user_name,report_count,data\n'
//     data.forEach(({accession_number,dt,study_id,modality,user_name,report_count,DATA})=>{
//         accession_number = accession_number || 'naf'
//         if (accession_number.indexOf('E+') > -1) accession_number = Number.parseInt(accession_number)
//         out += `"${accession_number}","${dt}",${study_id},${modality},${user_name},${report_count},"${DATA}"\n`
//     })
//     fs.writeFileSync(fileName, out)
// }
//
// let records = new Map()
// csv({noheader: true, delimiter: ',', headers: ['accession_number','dt','study_id','modality','user_name','report_count','data']})
//     .fromFile(input)
//     .then((arr) => {
//         arr.forEach((ele)=>{
//             let accession_number = ele.accession_number || 'naf'
//             if (accession_number.indexOf('E+') > -1) accession_number = Number.parseInt(accession_number)
//             let id = `${accession_number > '' ? accession_number : 'naf'}_${ele.study_id}`
//             if(records.has(id)) {
//                 records.get(id).push(ele)
//             } else {
//                 records.set(id, [ele])
//             }
//         })
//         fs.ensureDirSync(options.outpath)
//         records.forEach((value, key)=>{
//             let fileName = path.resolve(`${options.outpath}/${key.replace(/\//g, '_')}.csv`.replace(/[*]/g, ''))
//             writeCSVFile(fileName,value)
//         })
//     })

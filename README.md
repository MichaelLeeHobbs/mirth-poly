# Mirth Poly
This is only a proof of concept at the moment.

This produces an export of a channel in a detailed directory structure like this:
* channel_name - the top directory
    * destinationConnectors - directory containing a subdirectory for each destination connector
    * sourceConnector - directory containing the source connector
        * transformers
           * main.js
           * test.js
           * transformers.json
        * channel.json - the full channel export in JSON format
        * deployScript.js
        * postprocessingScript.js
        * undeployScript.js


## To try it out:
1. npm install
2. (windows) node .\src\index.js --username admin --password admin -h 127.0.0.1 --notls
3. (linux) node ./src/index.js --username admin --password admin -h 127.0.0.1 --notls
4. node ./src/index.js # show help

## Params/Options:
```text
Usage: --username <mirthUserName> --password <mirthUserPassword>

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  -u, --username  Mirth User Name                            [string] [required]
  -p, --password  Mirth User Password                        [string] [required]
  -h, --host      Mirth Host                     [string] [default: "127.0.0.1"]
  -o, --port      Mirth Port                          [string] [default: "8443"]
  -n, --notls     Disable TLS Check - required for self signed untrusted cert
                                                      [boolean] [default: false]
  -d, --outpath   Path to write files to        [string] [default: "./mirthSrc"]

Examples:
  Example: 'mirth-poly --username admin --password admin --host 10.100.96.61
  --port 8443 --notls'
```

## Test Functions
1. ~~getCodeTemplateLibraries() - downloads CodeTemplates.xml~~
2. ~~processCodeTemplateLibraries() - processes CodeTemplates.xml into files and folders~~
3. ~~getChannels() - downloads Channels.xml~~
4. ~~processChannels() - processes Channels.xml into files and folders - Not complete yet~~
5. ~~testMirthApi() - just test the mirth api~~
6. ~~main() - calls 1-4 in the correct order and waits as needed~~
7. Test Deserialize/Serialize Code Template Libraries - ```node src\test\MirthCodeLibrary.test.js``` 

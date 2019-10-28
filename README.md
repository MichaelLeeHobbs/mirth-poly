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


To try it out edit the stest.js file and set MIRTH_USER and MIRTH_PASSWORD

## Test Functions
1. getCodeTemplateLibraries() - downloads CodeTemplates.xml
2. processCodeTemplateLibraries() - processes CodeTemplates.xml into files and folders
3. getChannels() - downloads Channels.xml
4. processChannels() - processes Channels.xml into files and folders - Not complete yet
5. testMirthApi() - just test the mirth api

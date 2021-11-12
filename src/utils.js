const config = require('./config.js');
const output = require('./output.js');

function getContract(contractJson, contractAddress) {
    return new config.Config.provider.eth.Contract(contractJson, contractAddress);
}

function getParams(event, contractJson) {
    params = [];
    contractJson.forEach(abi => {
        if(abi.type === "event" && abi.name === event) {
            inputs = abi.inputs;
            inputs.forEach(input => {
                params.push({
                    type: input.type,
                    name: input.name
                });
            })
        }
    }); 
    return params;
}

function rawDataDecode(params, rawData) {
    var result = config.Config.provider.eth.abi.decodeParameters(params, rawData);
    return result;
}

function addToOutput(params, data) {
    filteredData = {};
    params.forEach(param => {
        filteredData[param.name] = data[param.name];
    });
    output.Output.jsonResult.push(filteredData);
}

module.exports = {
    'getContract': getContract,
    'getParams': getParams,
    'rawDataDecode': rawDataDecode,
    'addToOutput': addToOutput
}

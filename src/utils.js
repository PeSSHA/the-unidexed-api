import Config from 'config.js';
const Web3 = require('web3');

function getContract(contractJson, contractAddress) {
    return new Config.provider.eth.Contract(contractJson, contractAddress);
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
    var result = Config.provider.eth.abi.decodeParameters(params, rawData);
    return result;
}

function addToOutput(params, data) {
    params.forEach(param => {
        Output.jsonResult[param.name].push(data[param.name]);        
    })
}

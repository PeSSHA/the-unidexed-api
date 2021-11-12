const utils = require('./utils.js');
const output = require('./output.js');

async function getContractEvent(req){
    var contractAddress = req.body.contractAddress;
    var contractJson = req.body.contractJson;
    var contract = utils.getContract(
        contractJson,
        contractAddress
    );
    var fromBlock = req.body.fromBlock == null ? 'earliest' : req.body.fromBlock;
    var toBlock = req.body.toBlock == null ? 'latest' : req.body.toBlock;
    var params = utils.getParams(req.body.event, contractJson);
    output.Output.reset();
    output.Output.initFields(params);
    var result = await contract.getPastEvents(
        req.body.event,
        {
            'fromBlock': fromBlock,
            'toBlock': toBlock
        }
    );
    result.forEach(res => {
        var rawData = res.raw.data;
        var decodedRawData = utils.rawDataDecode(params, rawData);
        utils.addToOutput(params, decodedRawData);
    });
    return true;
}

module.exports = {
    'getContractEvent': getContractEvent
}

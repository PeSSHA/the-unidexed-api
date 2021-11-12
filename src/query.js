import 'utils.js';
import Output from 'output.js';

async function getContractEvent(req){
    var contractAddress = req.body.contractAddress;
    var contractJson = req.body.contractJson;
    var contract = getContract(
        contractJson,
        contractAddress
    );
    var fromBlock = req.body.fromBlock == null ? 'earliest' : req.body.fromBlock;
    var toBlock = req.body.toBlock == null ? 'latest' : req.body.toBlock;
    var params = getParams(req.body.event, contractJson);
    Output.reset();
    Output.initParams(params);
    var result = await contract.getPastEvents(
        req.body.event,
        {
            'fromBlock': fromBlock,
            'toBlock': toBlock
        }
    );
    result.forEach(res => {
        var rawData = res.raw.data;
        var decodedRawData = rawDataDecode(params, rawData);
        Output.jsonResult.push(decodedRawData);
    });
    return true;
}

import 'utils.js';
import Output from 'output.js';

async function getContractEvent(req){
    var contractAddress = req.body.contractAddress;
    var contractJson = req.body.contractJson;
    var contract = getContract(
        contractJson,
        contractAddress
    );
    var params = getParams(req.body.event, contractJson);
    Output.reset();
    Output.init(params);
    var result = await contract.getPastEvents(
        req.body.event
    );
    result.forEach(res => {
        var rawData = res.raw.data;
        var decodedRawData = rawDataDecode(params, rawData);
        addToOutput(params, decodedRawData);
    });
    
}

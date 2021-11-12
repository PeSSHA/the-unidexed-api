const output = require('./output.js');
const config = require('./config.js');
const query = require('./query.js');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/contractEvent', async (req, res) => {
    var provider = req.body.provider;
    config.Config.init(provider);
    var result = await query.getContractEvent(req);
    if(result) {
        if(req.body.csv == true){
            res.header('Content-Type', 'text/csv');
            res.attachment(req.body.event+'_ub.csv');
            res.send(output.Output.toCsv());
        }
        else{
            res.send(output.Output.jsonResult);
        }
    }
});

app.listen(3001, () => {
    console.log('listening on port 3001');
})

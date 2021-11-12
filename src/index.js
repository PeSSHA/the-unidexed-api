import Output from 'output.js';
import 'utils.js';
import 'query.js';

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

app.get('/contractEvent', (req, res) => {
    var result = getContractEvent(req);
    if(result) {
        res.send(Output.jsonResult);
    }
});

app.listen(3001, () => {
    console.log('listening on port 3001');
})

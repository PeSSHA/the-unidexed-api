import Config from 'config.js';
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

app.get('/contractEvent', (req, res) =>{
    var provider = req.body.provider;
    Config.init(provider);
});

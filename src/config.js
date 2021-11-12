const Web3 = require('web3');

class Config {
    static provider;

    static init(pvd) {
        this.provider = new Web3(pvd);
    }
}

module.exports = {
    'Config': Config
}

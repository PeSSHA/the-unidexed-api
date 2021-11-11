const Web3 = require('web3');

class Config {
    static provider;

    static init(pvd) {
        this.provider = Web3(pvd);
    }
}

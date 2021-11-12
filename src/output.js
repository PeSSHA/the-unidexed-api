const json2csv = require('json2csv');

class Output {
    static jsonResult = [];
    static fields = [];

    static initFields(params) {
        params.forEach(param => {
            this.fields.push(param.name);
        });
    }

    static reset() {
        this.jsonResult = [];
        this.fields = [];
    }

    static toCsv() {
        const parser = new json2csv.Parser(this.fields);
        const csv = parser.parse(this.jsonResult);
        return csv;
    }
}

module.exports = {
    'Output': Output
}

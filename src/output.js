class Output {
    static jsonResult = {};

    static init(params) {
        params.forEach(param => {
            this.jsonResult[param["name"]] = [];
        });
    }

    static reset() {
        this.jsonResult = {};
    }
}

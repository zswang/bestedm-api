"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
const irequest_1 = require("irequest");
const apiHost = `https://www.bestedm.org/mm-ms/apinew/`;
class BestEdm extends irequest_1.RequestBase {
    constructor(debug) {
        super(debug);
    }
    customerInfo() {
        return this.request(`${apiHost}account.php?do=customer-info`);
    }
}
exports.BestEdm = BestEdm;

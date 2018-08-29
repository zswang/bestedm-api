//
import { RequestBase } from "irequest";
const apiHost = `https://www.bestedm.org/mm-ms/apinew/`;
export class BestEdm extends RequestBase {
  constructor(debug?: boolean) {
    super(debug);
  }
  customerInfo() {
    return this.request(`${apiHost}account.php?do=customer-info`);
  }
}

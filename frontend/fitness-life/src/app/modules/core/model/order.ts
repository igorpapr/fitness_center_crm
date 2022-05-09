import {Customer} from "./customer";
import {Service} from "./service";

export class Order {

  id: number;

  customer: Customer;

  service: Service;

  dateStart: Date | undefined;

  dateEnd: Date | undefined;

  paymentAmount: number;
}

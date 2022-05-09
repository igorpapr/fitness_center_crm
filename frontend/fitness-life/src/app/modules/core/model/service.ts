import {Customer} from "./customer";
import {Order} from "./order";

export class Service {
  id: number;

  customer: Customer;

  order: Order;

  dateCreated: Date | undefined;

  active: boolean;

  description: string;

  price: number;

}

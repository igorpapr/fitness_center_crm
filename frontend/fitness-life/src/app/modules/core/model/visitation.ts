import {Customer} from "./customer";
import {Order} from "./order";

export class Visitation {

  id: number;

  customer: Customer;

  order: Order | null;

  dateStart: Date;

  dateEnd: Date;

}

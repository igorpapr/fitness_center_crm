export class OrderDto {

  id: number;

  customer: {id: number};

  service: {id: number};

  dateStart: Date | undefined;

  dateEnd: Date | undefined;

  paymentAmount: number;
}

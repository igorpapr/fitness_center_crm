export class VisitationDto {
  id: number;

  customer: {id: number};

  order: {id: number};

  dateStart: Date | undefined;

  dateEnd: Date | undefined;
}

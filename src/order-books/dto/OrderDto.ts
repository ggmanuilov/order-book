import { Min, Max } from 'class-validator';

export class OrderDto {
  @Min(0.0001, {
    message: 'Field Price is too short',
  })
  @Max(999999999, {
    message: 'Field Price is too short',
  })
  price: number;

  @Min(0.001, {
    message: 'Field Volume is too short',
  })
  @Max(999999999, {
    message: 'Field Volume is too short',
  })
  volume: number;
}

import { Min, Max } from 'class-validator';

export class OrderSnapshotDto {
  @Min(1, {
    message: 'Field Limit is too short',
  })
  @Max(1000, {
    message: 'Field Limit is too short',
  })
  limit: number;

  @Min(1, {
    message: 'Field Offset is too short',
  })
  offset: number;
}

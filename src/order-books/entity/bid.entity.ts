import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bid')
export class BidEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() price: number;
  @Column() volume: number;

  constructor(bidEntry?: Partial<BidEntity>) {
    Object.assign(this, bidEntry);
  }
}

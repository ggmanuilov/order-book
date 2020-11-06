import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ask')
export class AskEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() price: number;
  @Column() volume: number;

  constructor(askEntry?: Partial<AskEntity>) {
    Object.assign(this, askEntry);
  }
}

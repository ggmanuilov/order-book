import { IsIn, IsInt } from 'class-validator';
import { Type } from '../order-book.consts';

export class OrderDeleteDto {
  @IsInt()
  id: number;

  @IsIn([Type.ASK, Type.BID])
  side: string;

  isAsk() {
    return this.side === Type.ASK;
  }
  isBid() {
    return this.side === Type.BID;
  }

  constructor(orderDeleteDto?: Partial<OrderDeleteDto>) {
    Object.assign(this, orderDeleteDto);
  }
}

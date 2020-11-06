import { Type } from './order-book.consts';

export type OrderBookItem = {
  id: number;
  price: number;
  volume: number;
  side: Type.ASK | Type.BID;
};

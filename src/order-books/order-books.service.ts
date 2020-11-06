import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getManager,
  getRepository,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { AskEntity } from './entity/ask.entity';
import { BidEntity } from './entity/bid.entity';
import { OrderDto } from './dto/OrderDto';
import { OrderDeleteDto } from './dto/OrderDeleteDto';
import { OrderBookItem } from './order-book.types';
import { Type } from './order-book.consts';

@Injectable()
export class OrderBooksService {
  constructor(
    @InjectRepository(AskEntity)
    private readonly askRepository: Repository<AskEntity>,
    @InjectRepository(BidEntity)
    private readonly bidRepository: Repository<BidEntity>,
  ) {}

  async ask(orderDto: OrderDto): Promise<AskEntity> {
    return await getManager().transaction(async transactionalEntityManager => {
      const askRow = await transactionalEntityManager
        .getRepository(AskEntity)
        .findOne({
          lock: { mode: 'pessimistic_write_or_fail' },
          where: {
            price: LessThanOrEqual(orderDto.price),
          },
        });
      if (askRow) {
        throw new ConflictException(
          'Order with same or lower price, but from Bid side already persist in OrderBook',
        );
      }
      return await transactionalEntityManager
        .getRepository(AskEntity)
        .save(orderDto);
    });
  }

  async bid(orderDto: OrderDto): Promise<BidEntity> {
    return await getManager().transaction(async transactionalEntityManager => {
      const bidRow = await transactionalEntityManager
        .getRepository(BidEntity)
        .findOne({
          lock: { mode: 'pessimistic_write_or_fail' },
          where: {
            price: MoreThanOrEqual(orderDto.price),
          },
        });
      if (bidRow) {
        throw new ConflictException(
          'Order with same or higher price, but from Ask side already persist in OrderBook',
        );
      }
      return await transactionalEntityManager
        .getRepository(BidEntity)
        .save(orderDto);
    });
  }

  /**
   * Return true if success
   * @param orderDeleteDto
   */
  async remove(orderDeleteDto: OrderDeleteDto): Promise<boolean> {
    try {
      let deleteResult;
      if (await orderDeleteDto.isAsk()) {
        deleteResult = await this.askRepository.delete(orderDeleteDto.id);
      }
      if (await orderDeleteDto.isBid()) {
        deleteResult = await this.bidRepository.delete(orderDeleteDto.id);
      }
      return !!deleteResult.affected;
    } catch (e) {
      console.error({ orderDeleteDto, e });
    }
    return false;
  }

  /**
   * Return snapshot
   */
  async snapshot(): Promise<OrderBookItem[]> {
    const collect = [];
    let rows = await getRepository(AskEntity)
      .createQueryBuilder()
      .getMany();
    await this.buildCollection(rows, Type.ASK, collect);

    rows = await getRepository(BidEntity)
      .createQueryBuilder()
      .getMany();
    await this.buildCollection(rows, Type.BID, collect);
    return collect;
  }

  async buildCollection(rows, side, collect): Promise<void> {
    rows.forEach(row => {
      collect.push({ ...row, side } as OrderBookItem);
    });
  }
}

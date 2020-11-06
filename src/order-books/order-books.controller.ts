import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { OrderBooksService } from './order-books.service';
import { OrderDto } from './dto/OrderDto';
import { Response } from 'express';
import { OrderDeleteDto } from './dto/OrderDeleteDto';
import { Type } from './order-book.consts';

@Controller('order-books')
export class OrderBooksController {
  constructor(private orderBooksService: OrderBooksService) {}

  @Post('ask')
  async ask(@Body() orderDto: OrderDto) {
    return await this.orderBooksService.ask(orderDto);
  }

  @Post('bid')
  async bid(@Body() orderDto: OrderDto, @Res() res: Response) {
    const status = (await this.orderBooksService.bid(orderDto)) ? 202 : 400;
    return res.status(status).send();
  }

  @Delete('/ask/:id')
  async removeAsk(@Param('id') id: number, @Res() res: Response) {
    const orderDeleteDto = new OrderDeleteDto({ id: id, side: Type.ASK });
    const status = (await this.orderBooksService.remove(orderDeleteDto))
      ? 204
      : 404;
    return res.status(status).send();
  }

  @Delete('/bid/:id')
  async removeBid(@Param('id') id: number, @Res() res: Response) {
    const orderDeleteDto = new OrderDeleteDto({ id: id, side: Type.BID });
    const status = (await this.orderBooksService.remove(orderDeleteDto))
      ? 204
      : 404;
    return res.status(status).send();
  }

  @Get('snapshot')
  async snapshot() {
    return await this.orderBooksService.snapshot();
  }
}

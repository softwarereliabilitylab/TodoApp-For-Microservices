import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoarditemDto } from './dto/create-boarditem.dto';
import { BoarditemsService } from './boarditems.service';
import { Param } from '@nestjs/common';

@Controller('api/boarditems')
@UsePipes(new ValidationPipe({ transform: true }))
export class BoarditemsController {
  constructor(private readonly service: BoarditemsService) {}

  @Get()
  getBoarditems() {
    return this.service.findAll();
  }

  @Get(':id')
  getBoarditem(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  addBoarditem(@Body() createBoarditemDto: CreateBoarditemDto) {
    const { name, ip, comment } = createBoarditemDto;
    return this.service.createBoarditem(name, ip, comment);
  }

  @Put(':id')
  updateBoarditem(
    @Param('id') id: number,
    @Body() createBoarditemDto: CreateBoarditemDto,
  ) {
    const { name, ip, comment } = createBoarditemDto;
    return this.service.updateBoarditem(id, name, ip, comment);
  }

  @Delete(':id')
  deleteBoarditem(@Param('id') id: number) {
    this.service.remove(id);
  }
}

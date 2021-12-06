import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boarditem } from '../entity/boarditem.entity';

@Injectable()
export class BoarditemsService {
  constructor(
    @InjectRepository(Boarditem)
    private boarditemsRepository: Repository<Boarditem>,
  ) {}

  findAll(): Promise<Boarditem[]> {
    return this.boarditemsRepository.find();
  }

  createBoarditem(name: string, ip: string, comment: string) {
    const newBoarditem = new Boarditem();
    newBoarditem.name = name;
    newBoarditem.ip = ip;
    newBoarditem.comment = comment;
    newBoarditem.date = new Date();
    this.boarditemsRepository.insert(newBoarditem);
    return newBoarditem;
  }

  updateBoarditem(id: number, name: string, ip: string, comment: string) {
    const newBoarditem = new Boarditem();
    newBoarditem.name = name;
    newBoarditem.ip = ip;
    newBoarditem.comment = comment;
    this.boarditemsRepository.update(id, newBoarditem);
    return newBoarditem;
  }

  findOne(id: number): Promise<Boarditem> {
    return this.boarditemsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.boarditemsRepository.delete(id);
  }
}

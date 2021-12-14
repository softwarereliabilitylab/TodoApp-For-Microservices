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

  async findAll(): Promise<Boarditem[]> {
    return await this.boarditemsRepository.find();
  }

  async createBoarditem(name: string, ip: string, comment: string) {
    const newBoarditem = new Boarditem();
    newBoarditem.name = name;
    newBoarditem.ip = ip;
    newBoarditem.comment = comment;
    newBoarditem.date = new Date();
    newBoarditem.isChange = false;
    await this.boarditemsRepository.insert(newBoarditem);
    return newBoarditem;
  }

  async updateBoarditem(id: number, name: string, ip: string, comment: string) {
    const newBoarditem = new Boarditem();
    newBoarditem.name = name;
    newBoarditem.ip = ip;
    newBoarditem.comment = comment;
    newBoarditem.isChange = true;
    await this.boarditemsRepository.update(id, newBoarditem);
    return newBoarditem;
  }

  async findOne(id: number): Promise<Boarditem> {
    return await this.boarditemsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.boarditemsRepository.delete(id);
  }
}

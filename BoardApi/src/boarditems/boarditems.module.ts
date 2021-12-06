import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Boarditem } from '../entity/boarditem.entity';
import { BoarditemsController } from './boarditems.controller';
import { BoarditemsService } from './boarditems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Boarditem])],
  controllers: [BoarditemsController],
  providers: [BoarditemsService],
})
export class BoarditemsModule {}

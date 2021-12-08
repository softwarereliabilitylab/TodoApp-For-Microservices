import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { BoarditemsModule } from './boarditems/boarditems.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BoarditemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

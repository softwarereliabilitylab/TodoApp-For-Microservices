import { Test, TestingModule } from '@nestjs/testing';
import { BoarditemsController } from './boarditems.controller';

describe('BoarditemsController', () => {
  let controller: BoarditemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoarditemsController],
    }).compile();

    controller = module.get<BoarditemsController>(BoarditemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

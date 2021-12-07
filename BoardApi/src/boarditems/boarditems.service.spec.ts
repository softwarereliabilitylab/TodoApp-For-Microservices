import { Test, TestingModule } from '@nestjs/testing';
import { BoarditemsService } from './boarditems.service';

describe('BoarditemsService', () => {
  let service: BoarditemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoarditemsService],
    }).compile();

    service = module.get<BoarditemsService>(BoarditemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

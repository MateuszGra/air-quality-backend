import { Test, TestingModule } from '@nestjs/testing';
import { IndexLevelService } from './index-level.service';

describe('IndexLevelService', () => {
  let service: IndexLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexLevelService],
    }).compile();

    service = module.get<IndexLevelService>(IndexLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IndexLevelController } from './index-level.controller';

describe('IndexLevelController', () => {
  let controller: IndexLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndexLevelController],
    }).compile();

    controller = module.get<IndexLevelController>(IndexLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

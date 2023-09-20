import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

describe('BrandsController tests', () => {
  let controller: BrandsController;
  const mockBrandsService = {
    findOne: jest.fn((id) => ({
      id,
      name: 'Apple',
    })),
    findAll: jest.fn().mockImplementation(() => [
      { id: 1, name: 'Dell' },
      { id: 2, name: 'Apple' },
    ]),
    create: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn().mockImplementation((_) => 'This brand was delete'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService],
    })
      .overrideProvider(BrandsService)
      .useValue(mockBrandsService)
      .compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a brand', () => {
    const dto = { name: 'Dell' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockBrandsService.create).toHaveBeenCalledWith(dto);
  });

  it('Should update a brand', () => {
    const dto = { name: 'Dell' };
    expect(controller.update(1, dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockBrandsService.create).toHaveBeenCalledWith(dto);
  });

  it('Should retrieve a brand', () => {
    const id = 1;
    expect(controller.findOne(id)).toEqual({
      id,
      name: 'Apple',
    });
    expect(mockBrandsService.findOne).toHaveBeenCalledWith(id);
  });

  it('Should get a list of brands', () => {
    const paginationDto = {};
    expect(controller.findAll(paginationDto)).toEqual([
      { id: 1, name: 'Dell' },
      { id: 2, name: 'Apple' },
    ]);
    expect(mockBrandsService.findAll).toHaveBeenCalled();
  });

  it('Should delete a brand', () => {
    const id = 1;
    expect(controller.remove(id)).toEqual('This brand was delete');
    expect(mockBrandsService.remove).toHaveBeenCalledWith(id);
  });
});

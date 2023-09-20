import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BrandsService } from './brands.service';
import { Brand } from '../../../entities';

describe('BrandsService', () => {
  let service: BrandsService;

  const mockBrandsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((brand) =>
        Promise.resolve({ id: Date.now(), ...brand }),
      ),
    findOneBy: jest.fn().mockImplementation((id) => ({
      ...id,
      name: 'Dell',
    })),
    preload: jest.fn().mockImplementation((dto) => dto),
    remove: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockImplementation(() => [
      { id: 1, name: 'Dell' },
      { id: 2, name: 'Apple' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandsRepository,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve one brand record', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual({
      id,
      name: 'Dell',
    });
  });

  it('should retrieve a brand record', async () => {
    const paginationDto = {};
    const brands = await service.findAll(paginationDto);
    expect(Array.isArray(brands)).toBeTruthy();
    expect(brands.length).toBeGreaterThan(0);
  });

  it('should create a new brand record and return it', async () => {
    const brand = { name: 'Dell' };
    expect(await service.create(brand)).toEqual(brand);
  });

  it('should update a brand record', async () => {
    const brand = { id: 1, name: 'Apple' };
    expect(await service.update(brand.id, { name: brand.name })).toEqual(brand);
  });

  it('should remove a brand record', async () => {
    const id = 1;
    expect(await service.remove(id)).toEqual('This brand was delete');
  });
});

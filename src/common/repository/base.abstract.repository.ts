/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  //FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

interface HasId {
  //id: any;
  [key: string]: any;
}
export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }

  create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }
  createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  async findOneById(id: any): Promise<T> {
    const options: FindOneOptions<T> = {
      where: { id },
    };

    return await this.entity.findOne(options);
  }

  async findOneByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition);
  }

  async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }
  async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }
  async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }
}

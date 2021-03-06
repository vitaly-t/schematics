import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CORE_CONFIG_TOKEN,
  ICoreConfig,
  UsersService
} from '@demo/core-nestjs';
import { Repository } from 'typeorm';
import { OauthTokensAccesstoken } from '../entities/oauth-tokens-accesstoken.entity';

@Injectable()
export class OauthTokensAccesstokensService {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @InjectRepository(OauthTokensAccesstoken)
    private readonly repository: Repository<OauthTokensAccesstoken>
  ) {}
  async create(options: { item: OauthTokensAccesstoken }) {
    try {
      options.item = await this.repository.save(options.item);
      return { oauthTokensAccesstoken: options.item };
    } catch (error) {
      throw error;
    }
  }
  async update(options: { id: number; item: OauthTokensAccesstoken }) {
    options.item.id = options.id;
    try {
      options.item = await this.repository.save(options.item);
      return { oauthTokensAccesstoken: options.item };
    } catch (error) {
      throw error;
    }
  }
  async delete(options: { id: number }) {
    try {
      let item = await this.repository.findOneOrFail(options.id);
      item = await this.repository.save(item);
      await this.repository.delete(options.id);
      return { oauthTokensAccesstoken: null };
    } catch (error) {
      throw error;
    }
  }
  async findByProviderClientId(options: { id: number }) {
    try {
      const item = await this.repository.findOneOrFail({
        where: {
          providerClientId: options.id
        }
      });
      return { oauthTokensAccesstoken: item };
    } catch (error) {
      throw error;
    }
  }
  async findById(options: { id: number }) {
    try {
      const item = await this.repository.findOneOrFail(options.id);
      return { oauthTokensAccesstoken: item };
    } catch (error) {
      throw error;
    }
  }
  async findAll(options: {
    curPage: number;
    perPage: number;
    q?: string;
    sort?: string;
  }) {
    try {
      let objects: [OauthTokensAccesstoken[], number];
      let qb = this.repository.createQueryBuilder('oauthTokensAccesstoken');
      if (options.q) {
        qb = qb.where(
          'oauthTokensAccesstoken.name like :q or oauthTokensAccesstoken.title like :q or oauthTokensAccesstoken.id = :id',
          {
            q: `%${options.q}%`,
            id: +options.q
          }
        );
      }
      options.sort =
        options.sort &&
        new OauthTokensAccesstoken().hasOwnProperty(
          options.sort.replace('-', '')
        )
          ? options.sort
          : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('oauthTokensAccesstoken.' + field, 'DESC');
        } else {
          qb = qb.orderBy('oauthTokensAccesstoken.' + field, 'ASC');
        }
      }
      qb = qb
        .skip((options.curPage - 1) * options.perPage)
        .take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        contentTypes: objects[0],
        meta: {
          perPage: options.perPage,
          totalPages:
            options.perPage > objects[1]
              ? 1
              : Math.ceil(objects[1] / options.perPage),
          totalResults: objects[1],
          curPage: options.curPage
        }
      };
    } catch (error) {
      throw error;
    }
  }
}

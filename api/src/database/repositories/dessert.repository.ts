import { DessertType } from './../../utils/enum';

import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Dessert, { type IDessert } from '../models/dessert.model';

export interface DessertFilterOptions {
  //filters
  type?: DessertType;

  organizationId?: string;
}

export interface DessertFindOptions extends FindOptions<DessertFilterOptions> {
  order: OrderOptions;
}

export class DessertRepository extends BaseRepository<IDessert> {
  constructor() {
    super(Dessert);
  }

  findByIdWithOrg(
    id: string,
    organizationId: string,
  ): Promise<IDessert | null> {
    return this.model
      .findOne({ _id: id, organizationId, deletedAt: null })
      .populate('organization');
  }

  async findForAdmin(
    options: DessertFindOptions,
  ): Promise<PaginatedList<IDessert>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<IDessert> = { deletedAt: null };
    if (filter?.type) {
      query.type = filter.type;
    }

    if (filter?.organizationId) {
      query.organizationId = filter.organizationId;
    }

    if (search) {
      query.$or = [
        { 'name.ar': { $regex: new RegExp(search, 'i') } },
        { 'name.en': { $regex: new RegExp(search, 'i') } },
      ];
    }

    const total = await this.model.where(query).countDocuments();
    const results = await this.model
      .find(query)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      })
      .limit(pagination.pageSize)
      .skip((pagination.page - 1) * pagination.pageSize);

    return { results, total };
  }
}

export const dessertRepository = new DessertRepository();

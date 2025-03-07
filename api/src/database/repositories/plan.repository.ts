import { endOfDay, startOfDay } from 'date-fns';
import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Plan, { type IPlan } from '../models/plan.model';

export interface PlanFilterOptions {
  //filters
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PlanFindOptions extends FindOptions<PlanFilterOptions> {
  order: OrderOptions;
}

export class PlanRepository extends BaseRepository<IPlan> {
  constructor() {
    super(Plan);
  }

  async findForAdmin(options: PlanFindOptions): Promise<PaginatedList<IPlan>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<IPlan> = { deletedAt: null };
    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = startOfDay(filter.dateFrom);
      }
      if (filter.dateTo) {
        query.createdAt.$lte = endOfDay(filter.dateTo);
      }
    }

    if (search) {
      query.$or = [];
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

export const planRepository = new PlanRepository();

import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import SubscriptionOrder, {
  type ISubscriptionOrder,
} from '../models/subscription-order.model';

export interface SubscriptionOrderFilterOptions {
  //filters
  organizationId?: string;
}

export interface SubscriptionOrderFindOptions
  extends FindOptions<SubscriptionOrderFilterOptions> {
  order: OrderOptions;
}

export class SubscriptionOrderRepository extends BaseRepository<ISubscriptionOrder> {
  constructor() {
    super(SubscriptionOrder);
  }

  async findById(id: string): Promise<ISubscriptionOrder | null> {
    return await this.model
      .findOne({ _id: id, deletedAt: null })
      .populate(['organization', 'plan']);
  }

  async findForAdmin(
    options: SubscriptionOrderFindOptions,
  ): Promise<PaginatedList<ISubscriptionOrder>> {
    const { order, pagination, filter, search } = options;

    const query: FilterQuery<ISubscriptionOrder> = { deletedAt: null };
    if (filter?.organizationId) {
      query.organizationId = filter.organizationId;
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
      .skip((pagination.page - 1) * pagination.pageSize)
      .populate(['organization', 'plan']);
    return { results, total };
  }
}

export const subscriptionOrderRepository = new SubscriptionOrderRepository();

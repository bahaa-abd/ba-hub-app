import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Subscription, { type ISubscription } from '../models/subscription.model';

export interface SubscriptionFilterOptions {
  //filters
  organizationId?: string;
}

export interface SubscriptionFindOptions
  extends FindOptions<SubscriptionFilterOptions> {
  order: OrderOptions;
}

export class SubscriptionRepository extends BaseRepository<ISubscription> {
  constructor() {
    super(Subscription);
  }

  findById(id: string): Promise<ISubscription | null> {
    return this.model
      .findById(id)
      .where({ deletedAt: null })
      .populate(['organization', 'plan', 'payment']);
  }

  async findForAdmin(
    options: SubscriptionFindOptions,
  ): Promise<PaginatedList<ISubscription>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<ISubscription> = { deletedAt: null };

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
      .populate(['plan', 'payment', 'organization']);

    return { results, total };
  }
}

export const subscriptionRepository = new SubscriptionRepository();

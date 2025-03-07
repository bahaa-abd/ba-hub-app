import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Payment, { type IPayment } from '../models/payment.model';
import { endOfDay, startOfDay } from 'date-fns';

export interface PaymentFilterOptions {
  //filters
  dateFrom?: Date;
  dateTo?: Date;

  organizationId?: string;
}

export interface PaymentFindOptions extends FindOptions<PaymentFilterOptions> {
  order: OrderOptions;
}

export class PaymentRepository extends BaseRepository<IPayment> {
  constructor() {
    super(Payment);
  }

  async findById(id: string): Promise<IPayment | null> {
    return await this.model
      .findOne({ _id: id, deletedAt: null })
      .populate(['organization', 'subscription']);
  }

  async findForAdmin(
    options: PaymentFindOptions,
  ): Promise<PaginatedList<IPayment>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<IPayment> = { deletedAt: null };
    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = startOfDay(filter.dateFrom);
      }
      if (filter.dateTo) {
        query.createdAt.$lte = endOfDay(filter.dateTo);
      }
    }

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
      .populate(['organization', 'subscription']);

    return { results, total };
  }
}

export const paymentRepository = new PaymentRepository();

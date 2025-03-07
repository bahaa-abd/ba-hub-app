import { Types, type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Session, { type ISession } from '../models/session.model';
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { SessionStatus } from '../../utils/enum';

export interface SessionFilterOptions {
  //filters
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
  organizationId: string;
}

interface OrganizationStatistics {
  totalSessions: number;
  totalRevenue: number;
  sessionsByStatus: Array<{
    _id: string;
    count: number;
  }>;
  revenueByDay: Array<{
    date: string;
    totalRevenue: number;
  }>;
  dessertsByDay: Array<{
    date: string;
    desserts: Array<{
      name: string;
      totalSold: number;
      totalRevenue: number;
    }>;
  }>;
  revenueByMonth: Array<{
    date: string;
    totalRevenue: number;
  }>;
  dessertsByMonth: Array<{
    date: string;
    desserts: Array<{
      name: string;
      totalSold: number;
      totalRevenue: number;
    }>;
  }>;
}

export interface SessionFindOptions extends FindOptions<SessionFilterOptions> {
  order: OrderOptions;
}

export class SessionRepository extends BaseRepository<ISession> {
  constructor() {
    super(Session);
  }

  findByIdWithOrg(
    id: string,
    organizationId: string,
  ): Promise<ISession | null> {
    return this.model
      .findOne({ _id: id, organizationId, deletedAt: null })
      .populate(['organization', 'desserts.dessert', 'user']);
  }

  findById(id: string): Promise<ISession | null> {
    return this.model
      .findById(id)
      .where({ deletedAt: null })
      .populate(['organization', 'desserts.dessert', 'user']);
  }

  async findForAdmin(
    options: SessionFindOptions,
  ): Promise<PaginatedList<ISession>> {
    const { order, pagination, search, filter } = options;

    const query: FilterQuery<ISession> = { deletedAt: null };
    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) {
        query.createdAt.$gte = startOfDay(filter.dateFrom);
      }
      if (filter.dateTo) {
        query.createdAt.$lte = endOfDay(filter.dateTo);
      }
    }

    if (filter?.status) {
      query.status = filter.status;
    }

    if (search) {
      query.$or = [{ username: { $regex: new RegExp(search, 'i') } }];
    }

    if (filter?.organizationId) {
      query.organizationId = filter.organizationId;
    }

    const total = await this.model.where(query).countDocuments();
    const results = await this.model
      .find(query)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      })
      .limit(pagination.pageSize)
      .skip((pagination.page - 1) * pagination.pageSize)
      .populate(['user', 'desserts.dessert']);

    return { results, total };
  }

  async getOrganizationStatistics(
    organizationId: string,
    fromDate?: Date,
    toDate?: Date,
  ): Promise<OrganizationStatistics> {
    const now = new Date();
    fromDate = fromDate ? startOfDay(fromDate) : startOfDay(subDays(now, 7));
    toDate = toDate ? endOfDay(toDate) : endOfDay(now);
    const startYear = startOfYear(fromDate);
    const endYear = endOfYear(fromDate);
    // Get sessions statistics
    const totalRevenue = Math.ceil(
      (await this.findAll()).reduce(
        (sum, curr) => sum + (curr.totalCost ?? 0),
        0,
      ),
    );

    const sessions = await this.model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$deletedAt', null] },
              { $eq: ['$organizationId', new Types.ObjectId(organizationId)] },
            ],
          },
        },
      },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const revenueByDay = await this.model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: ['$createdAt', fromDate] },
              { $lte: ['$createdAt', toDate] },
              { $eq: ['$status', SessionStatus.ended] },
              { $eq: ['$deletedAt', null] },
              { $eq: ['$organizationId', new Types.ObjectId(organizationId)] },
            ],
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalCost' },
          dessertsRevenue: { $sum: '$additionalCost' },
          sessionsRevenue: { $sum: '$subtotal' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get desserts statistics
    const dessertsByDay = await this.model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$status', SessionStatus.ended] },
              { $gte: ['$createdAt', fromDate] },
              { $lte: ['$createdAt', toDate] },
              { $eq: ['$deletedAt', null] },
              { $eq: ['$organizationId', new Types.ObjectId(organizationId)] },
            ],
          },
        },
      },
      { $unwind: '$desserts' },
      {
        $lookup: {
          from: 'Dessert',
          localField: 'desserts.dessertId',
          foreignField: '_id',
          as: 'dessertInfo',
        },
      },
      { $unwind: '$dessertInfo' },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            name: '$dessertInfo.name',
          },
          count: { $sum: '$desserts.count' },
          revenue: {
            $sum: { $multiply: ['$desserts.count', '$dessertInfo.price'] },
          },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          data: {
            $push: {
              name: '$_id.name',
              count: '$count',
              revenue: '$revenue',
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const revenueByMonth = await this.model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: ['$createdAt', startYear] },
              { $lte: ['$createdAt', endYear] },
              { $eq: ['$status', SessionStatus.ended] },
              { $eq: ['$deletedAt', null] },
              { $eq: ['$organizationId', new Types.ObjectId(organizationId)] },
            ],
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$totalCost' },
          dessertsRevenue: { $sum: '$additionalCost' },
          sessionsRevenue: { $sum: '$subtotal' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get desserts statistics
    const dessertsByMonth = await this.model.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$status', SessionStatus.ended] },
              { $gte: ['$createdAt', startYear] },
              { $lte: ['$createdAt', endYear] },
              { $eq: ['$deletedAt', null] },
              { $eq: ['$organizationId', new Types.ObjectId(organizationId)] },
            ],
          },
        },
      },
      { $unwind: '$desserts' },
      {
        $lookup: {
          from: 'Dessert',
          localField: 'desserts.dessertId',
          foreignField: '_id',
          as: 'dessertInfo',
        },
      },
      { $unwind: '$dessertInfo' },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            name: '$dessertInfo.name',
          },
          count: { $sum: '$desserts.count' },
          revenue: {
            $sum: { $multiply: ['$desserts.count', '$dessertInfo.price'] },
          },
        },
      },
      {
        $group: {
          _id: '$_id.date',
          data: {
            $push: {
              name: '$_id.name',
              count: '$count',
              revenue: '$revenue',
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return {
      totalSessions: sessions.reduce((sum, s) => sum + s.count, 0),
      totalRevenue,
      sessionsByStatus: sessions,
      revenueByDay,
      revenueByMonth,
      dessertsByDay,
      dessertsByMonth,
    };
  }
}

export const sessionRepository = new SessionRepository();

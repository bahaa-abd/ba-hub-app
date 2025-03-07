import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  SubscriptionOrderFindOptions,
  subscriptionOrderRepository,
} from '../database/repositories/subscription-order.repository';
import {
  ISubscriptionOrderAllSchema,
  ISubscriptionOrderIdSchema,
  ISubscriptionOrderCreateSchema,
  ISubscriptionOrderUpdateSchema,
} from '../schemas/subscription-order.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { needRecord } from '../utils/record';
import { SubscriptionOrderStatus } from '../utils/enum';
import { createSubscriptionService } from '../services/internal/subscriptions/create';
import { IOrganizationHeaderSchema } from '../schemas/organization.schema';

export class SubscriptionOrderController {
  // Get all SubscriptionOrders by author
  public getSubscriptionOrders = asyncHandler(
    async (
      req: ParsedRequest<void, ISubscriptionOrderAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: SubscriptionOrderFindOptions = {
        filter: {
          // filters
          organizationId: req.valid.query.organizationId,
        },
        search: req.valid.query.search,
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const subscriptionOrders =
        await subscriptionOrderRepository.findForAdmin(options);

      res.ok({ message: 'success', data: subscriptionOrders });
    },
  );

  public getMine = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        ISubscriptionOrderAllSchema,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: SubscriptionOrderFindOptions = {
        filter: {
          // filters
          organizationId: req.valid.headers['organization-id'],
        },
        search: req.valid.query.search,
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const subscriptionOrders =
        await subscriptionOrderRepository.findForAdmin(options);

      res.ok({ message: 'success', data: subscriptionOrders });
    },
  );

  // Get subscriptionOrder by Id for authenticated user
  public getSubscriptionOrder = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionOrderIdSchema>,
      res: Response,
    ): Promise<void> => {
      const subscriptionOrder = needRecord(
        await subscriptionOrderRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionOrder not found'),
      );

      res.ok({ message: 'success', data: subscriptionOrder });
    },
  );

  // Create subscriptionOrder handler
  public createSubscriptionOrder = asyncHandler(
    async (
      req: ParsedRequest<ISubscriptionOrderCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newSubscriptionOrder = req.valid.body;
      const subscriptionOrder =
        await subscriptionOrderRepository.insert(newSubscriptionOrder);
      if (subscriptionOrder === null) {
        throw new InternalError();
      }
      res.created({
        message: 'SubscriptionOrder has been created',
        data: subscriptionOrder,
      });
    },
  );

  // Update subscriptionOrder by Id for authenticated user
  public updateSubscriptionOrder = asyncHandler(
    async (
      req: ParsedRequest<
        ISubscriptionOrderUpdateSchema,
        void,
        ISubscriptionOrderIdSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const subscriptionOrder = needRecord(
        await subscriptionOrderRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionOrder not found'),
      );

      const data = await subscriptionOrderRepository.patchById(
        subscriptionOrder.id,
        updateBody,
      );

      res.ok({ message: 'SubscriptionOrder has been updated', data });
    },
  );

  // Delete subscriptionOrder by Id for authenticated user
  public deleteSubscriptionOrder = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionOrderIdSchema>,
      res: Response,
    ): Promise<void> => {
      const subscriptionOrder = needRecord(
        await subscriptionOrderRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionOrder not found'),
      );

      await subscriptionOrderRepository.deleteById(subscriptionOrder.id);
      res.noContent({ message: 'SubscriptionOrder deleted successfully' });
    },
  );

  public approve = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionOrderIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const subscriptionOrder = needRecord(
        await subscriptionOrderRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionOrder not found'),
      );

      await subscriptionOrderRepository.patchById(subscriptionOrder.id, {
        status: SubscriptionOrderStatus.approved,
      });

      await createSubscriptionService({
        organizationId: subscriptionOrder.organizationId,
        planId: subscriptionOrder.planId,
      });

      res.ok({ message: 'SubscriptionOrder has been approved' });
    },
  );

  public refuse = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionOrderIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const subscriptionOrder = needRecord(
        await subscriptionOrderRepository.findById(req.valid.params.id),
        new NotFoundError('SubscriptionOrder not found'),
      );

      await subscriptionOrderRepository.patchById(subscriptionOrder.id, {
        status: SubscriptionOrderStatus.refused,
      });

      res.ok({ message: 'SubscriptionOrder has been refused' });
    },
  );
}

export const subscriptionOrderController = new SubscriptionOrderController();

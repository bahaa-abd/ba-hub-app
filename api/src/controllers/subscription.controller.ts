import { Response, ParsedRequest } from 'express';
import { NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  SubscriptionFindOptions,
  subscriptionRepository,
} from '../database/repositories/subscription.repository';
import {
  ISubscriptionAllSchema,
  ISubscriptionIdSchema,
  ISubscriptionCreateSchema,
  ISubscriptionUpdateSchema,
} from '../schemas/subscription.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { needRecord } from '../utils/record';
import { createSubscriptionService } from '../services/internal/subscriptions/create';
import { IOrganizationHeaderSchema } from '../schemas/organization.schema';

export class SubscriptionController {
  // Get all Subscriptions by author
  public getSubscriptions = asyncHandler(
    async (
      req: ParsedRequest<void, ISubscriptionAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: SubscriptionFindOptions = {
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
      const subscriptions = await subscriptionRepository.findForAdmin(options);

      res.ok({ message: 'success', data: subscriptions });
    },
  );

  // Get subscription by Id for authenticated user
  public getSubscription = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionIdSchema>,
      res: Response,
    ): Promise<void> => {
      const subscription = needRecord(
        await subscriptionRepository.findById(req.valid.params.id),
        new NotFoundError('Subscription not found'),
      );

      res.ok({ message: 'success', data: subscription });
    },
  );

  // Create subscription handler
  public createSubscription = asyncHandler(
    async (
      req: ParsedRequest<ISubscriptionCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const subscription = await createSubscriptionService(req.valid.body);
      res.created({
        message: 'Subscription has been created',
        data: subscription,
      });
    },
  );

  // Update subscription by Id for authenticated user
  public updateSubscription = asyncHandler(
    async (
      req: ParsedRequest<
        ISubscriptionUpdateSchema,
        void,
        ISubscriptionIdSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const subscription = needRecord(
        await subscriptionRepository.findById(req.valid.params.id),
        new NotFoundError('Subscription not found'),
      );

      const data = await subscriptionRepository.patchById(
        subscription.id,
        updateBody,
      );

      res.ok({ message: 'Subscription has been updated', data });
    },
  );

  // Delete subscription by Id for authenticated user
  public deleteSubscription = asyncHandler(
    async (
      req: ParsedRequest<void, void, ISubscriptionIdSchema>,
      res: Response,
    ): Promise<void> => {
      const subscription = needRecord(
        await subscriptionRepository.findById(req.valid.params.id),
        new NotFoundError('Subscription not found'),
      );

      await subscriptionRepository.deleteById(subscription.id);
      res.noContent({ message: 'Subscription deleted successfully' });
    },
  );

  public getMine = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        ISubscriptionAllSchema,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: SubscriptionFindOptions = {
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
      const subscriptions = await subscriptionRepository.findForAdmin(options);

      res.ok({ message: 'success', data: subscriptions });
    },
  );
}

export const subscriptionController = new SubscriptionController();

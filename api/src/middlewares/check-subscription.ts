import { Response, NextFunction, ParsedRequest } from 'express';
import { BadRequestError, NotFoundError } from '../core/ApiError';
import Logger from '../core/Logger';
import { subscriptionRepository } from '../database/repositories/subscription.repository';
import { OrgStatus, SubscriptionStatus } from '../utils/enum';
import { IOrganizationHeaderSchema } from '../schemas/organization.schema';
import { needRecord } from '../utils/record';
import { organizationRepository } from '../database/repositories/organization.repository';
import asyncHandler from './asyncHandler';

export const checkSubscriptionMiddleware = asyncHandler(
  async (
    req: ParsedRequest<void, void, void, IOrganizationHeaderSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    const org = needRecord(
      await organizationRepository.findOneBy({
        _id: req.valid.headers['organization-id'],
        status: OrgStatus.approved,
        userId: req.user.id,
      }),
      new NotFoundError('No active subscription found'),
    );

    const subscription = needRecord(
      await subscriptionRepository.findById(org.recentSubscriptionId as string),
      new NotFoundError('No active subscription found'),
    );

    if (subscription.expiresDate.getTime() < Date.now()) {
      if (subscription.status !== SubscriptionStatus.expired) {
        await subscriptionRepository.patchById(subscription.id, {
          status: SubscriptionStatus.expired,
        });
      }
      Logger.info(
        `Organization ${subscription.organizationId} subscription has expired`,
      );
      throw new BadRequestError(
        'Your subscription has expired. Please renew or create a new one.',
      );
    }
    next();
  },
);

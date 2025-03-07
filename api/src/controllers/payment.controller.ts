import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  PaymentFindOptions,
  paymentRepository,
} from '../database/repositories/payment.repository';
import {
  IPaymentAllSchema,
  IPaymentIdSchema,
  IPaymentCreateSchema,
  IPaymentUpdateSchema,
} from '../schemas/payment.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { needRecord } from '../utils/record';
import { IOrganizationIdSchema } from '../schemas/organization.schema';
import { subscriptionRepository } from '../database/repositories/subscription.repository';

export class PaymentController {
  // Get all Payments by author
  public getPayments = asyncHandler(
    async (
      req: ParsedRequest<void, IPaymentAllSchema, IOrganizationIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      let organizationId = req.valid.query.organizationId ?? undefined;
      if (req.valid.params !== null) {
        organizationId = req.valid.params.id;
      }
      const options: PaymentFindOptions = {
        filter: {
          // filters
          dateFrom: req.valid.query.dateFrom,
          dateTo: req.valid.query.dateTo,
          organizationId,
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
      const payments = await paymentRepository.findForAdmin(options);

      res.ok({ message: 'success', data: payments });
    },
  );

  // Get payment by Id for authenticated user
  public getPayment = asyncHandler(
    async (
      req: ParsedRequest<void, void, IPaymentIdSchema>,
      res: Response,
    ): Promise<void> => {
      const payment = needRecord(
        await paymentRepository.findById(req.valid.params.id),
        new NotFoundError('Payment not found'),
      );

      res.ok({ message: 'success', data: payment });
    },
  );

  // Create payment handler
  public createPayment = asyncHandler(
    async (
      req: ParsedRequest<IPaymentCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newPayment = req.valid.body;
      const subscription = needRecord(
        await subscriptionRepository.findById(newPayment.subscriptionId),
        new NotFoundError('Subscription not found'),
      );
      const payment = await paymentRepository.insert({
        ...newPayment,
        organizationId: subscription.organizationId,
      });
      if (payment === null) {
        throw new InternalError();
      }
      res.created({ message: 'Payment has been created', data: payment });
    },
  );

  // Update payment by Id for authenticated user
  public updatePayment = asyncHandler(
    async (
      req: ParsedRequest<IPaymentUpdateSchema, void, IPaymentIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const payment = needRecord(
        await paymentRepository.findById(req.valid.params.id),
        new NotFoundError('Payment not found'),
      );

      const data = await paymentRepository.patchById(payment.id, updateBody);

      res.ok({ message: 'Payment has been updated', data });
    },
  );

  // Delete payment by Id for authenticated user
  public deletePayment = asyncHandler(
    async (
      req: ParsedRequest<void, void, IPaymentIdSchema>,
      res: Response,
    ): Promise<void> => {
      const payment = needRecord(
        await paymentRepository.findById(req.valid.params.id),
        new NotFoundError('Payment not found'),
      );

      await paymentRepository.deleteById(payment.id);
      res.noContent({ message: 'Payment deleted successfully' });
    },
  );
}

export const paymentController = new PaymentController();

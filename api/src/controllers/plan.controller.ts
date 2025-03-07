import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  PlanFindOptions,
  planRepository,
} from '../database/repositories/plan.repository';
import {
  IPlanAllSchema,
  IPlanIdSchema,
  IPlanCreateSchema,
  IPlanUpdateSchema,
} from '../schemas/plan.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { needRecord } from '../utils/record';

export class PlanController {
  // Get all Plans by author
  public getPlans = asyncHandler(
    async (
      req: ParsedRequest<void, IPlanAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: PlanFindOptions = {
        filter: {
          // filters
          dateFrom: req.valid.query.dateFrom,
          dateTo: req.valid.query.dateTo,
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
      const plans = await planRepository.findForAdmin(options);

      res.ok({ message: 'success', data: plans });
    },
  );

  // Get plan by Id for authenticated user
  public getPlan = asyncHandler(
    async (
      req: ParsedRequest<void, void, IPlanIdSchema>,
      res: Response,
    ): Promise<void> => {
      const plan = needRecord(
        await planRepository.findById(req.valid.params.id),
        new NotFoundError('Plan not found'),
      );

      res.ok({ message: 'success', data: plan });
    },
  );

  // Create plan handler
  public createPlan = asyncHandler(
    async (
      req: ParsedRequest<IPlanCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newPlan = req.valid.body;
      const plan = await planRepository.insert(newPlan);
      if (plan === null) {
        throw new InternalError();
      }
      res.created({ message: 'Plan has been created', data: plan });
    },
  );

  // Update plan by Id for authenticated user
  public updatePlan = asyncHandler(
    async (
      req: ParsedRequest<IPlanUpdateSchema, void, IPlanIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const plan = needRecord(
        await planRepository.findById(req.valid.params.id),
        new NotFoundError('Plan not found'),
      );

      const data = await planRepository.patchById(plan.id, updateBody);

      res.ok({ message: 'Plan has been updated', data });
    },
  );

  // Delete plan by Id for authenticated user
  public deletePlan = asyncHandler(
    async (
      req: ParsedRequest<void, void, IPlanIdSchema>,
      res: Response,
    ): Promise<void> => {
      const plan = needRecord(
        await planRepository.findById(req.valid.params.id),
        new NotFoundError('Plan not found'),
      );

      await planRepository.deleteById(plan.id);
      res.noContent({ message: 'Plan deleted successfully' });
    },
  );
}

export const planController = new PlanController();

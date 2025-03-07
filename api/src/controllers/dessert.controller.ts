import { Response, ParsedRequest } from 'express';
import { ConflictError, InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  DessertFindOptions,
  dessertRepository,
} from '../database/repositories/dessert.repository';
import {
  IDessertAllSchema,
  IDessertIdSchema,
  IDessertCreateSchema,
  IDessertUpdateSchema,
} from '../schemas/dessert.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { existRecord, needRecord } from '../utils/record';
import { IOrganizationHeaderSchema } from '../schemas/organization.schema';

export class DessertController {
  // Get all Desserts by author
  public getDesserts = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        IDessertAllSchema,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: DessertFindOptions = {
        filter: {
          // filters
          type: req.valid.query.type,

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
      const desserts = await dessertRepository.findForAdmin(options);

      res.ok({ message: 'success', data: desserts });
    },
  );

  // Get dessert by Id for authenticated user
  public getDessert = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        void,
        IDessertIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      const dessert = needRecord(
        await dessertRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError('Dessert not found'),
      );

      res.ok({ message: 'success', data: dessert });
    },
  );

  // Create dessert handler
  public createDessert = asyncHandler(
    async (
      req: ParsedRequest<
        IDessertCreateSchema,
        void,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newDessert = req.valid.body;

      existRecord(
        await dessertRepository.findOneBy({
          'name.en': newDessert.name.en,
          'name.ar': newDessert.name.ar,
          type: newDessert.type,
          organizationId: req.valid.headers['organization-id'],
        }),
        new ConflictError(
          `Dessert with name "${newDessert.name}" already exists`,
        ),
      );

      const dessert = await dessertRepository.insert({
        ...newDessert,
        organizationId: req.valid.headers['organization-id'],
      });
      if (dessert === null) {
        throw new InternalError();
      }
      res.created({ message: 'Dessert has been created', data: dessert });
    },
  );

  // Update dessert by Id for authenticated user
  public updateDessert = asyncHandler(
    async (
      req: ParsedRequest<
        IDessertUpdateSchema,
        void,
        IDessertIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const dessert = needRecord(
        await dessertRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError('Dessert not found'),
      );

      const data = await dessertRepository.patchById(dessert.id, updateBody);

      res.ok({ message: 'Dessert has been updated', data });
    },
  );

  // Delete dessert by Id for authenticated user
  public deleteDessert = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        void,
        IDessertIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      const dessert = needRecord(
        await dessertRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError('Dessert not found'),
      );

      await dessertRepository.deleteById(dessert.id);
      res.noContent({ message: 'Dessert deleted successfully' });
    },
  );
}

export const dessertController = new DessertController();

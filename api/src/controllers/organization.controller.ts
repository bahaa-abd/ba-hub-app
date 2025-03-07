import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  OrganizationFindOptions,
  organizationRepository,
} from '../database/repositories/organization.repository';
import {
  IOrganizationAllSchema,
  IOrganizationIdSchema,
  IOrganizationCreateSchema,
  IOrganizationUpdateSchema,
  IOrganizationHeaderSchema,
  IOrganizationStatisticsSchema,
} from '../schemas/organization.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { needRecord } from '../utils/record';
import { OrgStatus, RoleCode } from '../utils/enum';
import { sessionRepository } from '../database/repositories/session.repository';

export class OrganizationController {
  // Get all Organizations by author
  public getOrganizations = asyncHandler(
    async (
      req: ParsedRequest<void, IOrganizationAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: OrganizationFindOptions = {
        filter: {
          dateFrom: req.valid.query.dateFrom,
          dateTo: req.valid.query.dateTo,
          status: req.valid.query.status,
          userId: req.user.role === RoleCode.USER ? req.user.id : undefined,
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
      const organizations = await organizationRepository.findForAdmin(options);

      res.ok({ message: 'success', data: organizations });
    },
  );

  // Get organization by Id for authenticated user
  public getOrganization = asyncHandler(
    async (
      req: ParsedRequest<void, void, IOrganizationIdSchema>,
      res: Response,
    ): Promise<void> => {
      const organization = needRecord(
        await organizationRepository.findById(req.valid.params.id),
        new NotFoundError('Organization not found'),
      );

      res.ok({ message: 'success', data: organization });
    },
  );

  // Create organization handler
  public createOrganization = asyncHandler(
    async (
      req: ParsedRequest<IOrganizationCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newOrganization = req.valid.body;
      if (!newOrganization.userId) {
        newOrganization.userId = req.user.id;
      }

      const organization = await organizationRepository.insert(newOrganization);
      if (organization === null) {
        throw new InternalError();
      }
      res.created({
        message: 'Organization has been created',
        data: organization,
      });
    },
  );

  // Update organization by Id for authenticated user
  public updateOrganization = asyncHandler(
    async (
      req: ParsedRequest<
        IOrganizationUpdateSchema,
        void,
        IOrganizationIdSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const organization = needRecord(
        await organizationRepository.findByIdWithUser(
          req.valid.params.id,
          req.user.id,
        ),
        new NotFoundError('Organization not found'),
      );

      const data = await organizationRepository.patchById(
        organization.id,
        updateBody,
      );

      res.ok({ message: 'Organization has been updated', data });
    },
  );

  // Delete organization by Id for authenticated user
  public deleteOrganization = asyncHandler(
    async (
      req: ParsedRequest<void, void, IOrganizationIdSchema>,
      res: Response,
    ): Promise<void> => {
      const organization = needRecord(
        await organizationRepository.findById(req.valid.params.id),
        new NotFoundError('Organization not found'),
      );

      await organizationRepository.deleteById(organization.id);
      res.noContent({ message: 'Organization deleted successfully' });
    },
  );

  public approve = asyncHandler(
    async (
      req: ParsedRequest<void, void, IOrganizationIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const organization = needRecord(
        await organizationRepository.findById(req.valid.params.id),
        new NotFoundError('Organization not found'),
      );

      await organizationRepository.patchById(organization.id, {
        status: OrgStatus.approved,
      });

      res.ok({ message: 'Organization has been approved' });
    },
  );

  public refuse = asyncHandler(
    async (
      req: ParsedRequest<void, void, IOrganizationIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const organization = needRecord(
        await organizationRepository.findById(req.valid.params.id),
        new NotFoundError('Organization not found'),
      );

      await organizationRepository.patchById(organization.id, {
        status: OrgStatus.refused,
      });

      res.ok({ message: 'Organization has been refused' });
    },
  );

  public statistics = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        IOrganizationStatisticsSchema,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      const data = await sessionRepository.getOrganizationStatistics(
        req.valid.headers['organization-id'],
        req.valid.query.fromDate,
        req.valid.query.toDate,
      );

      res.ok({ message: 'ok', data });
    },
  );
}

export const organizationController = new OrganizationController();

import { Response, ParsedRequest } from 'express';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  SessionFindOptions,
  sessionRepository,
} from '../database/repositories/session.repository';
import {
  ISessionAllSchema,
  ISessionIdSchema,
  ISessionCreateSchema,
  ISessionUpdateSchema,
  ISessionAddDessertSchema,
} from '../schemas/session.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { needRecord } from '../utils/record';
import { organizationRepository } from '../database/repositories/organization.repository';
import { userRepository } from '../database/repositories/user.repository';
import { IOrganizationHeaderSchema } from '../schemas/organization.schema';
import { SessionStatus } from '../utils/enum';
import { calculateCost } from '../services/internal/sessions/cost';
import { dessertRepository } from '../database/repositories/dessert.repository';

export class SessionController {
  // Get all Sessions by author
  public getSessions = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        ISessionAllSchema,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: SessionFindOptions = {
        filter: {
          status: req.valid.query.status,
          dateFrom: req.valid.query.dateFrom,
          dateTo: req.valid.query.dateTo,
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
      const sessions = await sessionRepository.findForAdmin(options);

      res.ok({ message: 'success', data: sessions });
    },
  );

  // Get session by Id for authenticated user
  public getSession = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        void,
        ISessionIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      const session = needRecord(
        await sessionRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError('Session not found'),
      );

      res.ok({ message: 'success', data: session });
    },
  );

  // Create session handler
  public createSession = asyncHandler(
    async (
      req: ParsedRequest<
        ISessionCreateSchema,
        void,
        void,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const { username, numberOfPersons } = req.valid.body;

      const organization = needRecord(
        await organizationRepository.findByIdWithUser(
          req.valid.headers['organization-id'],
          req.user.id,
        ),
      );

      let user = await userRepository.findOneBy({ name: username });

      // If the user doesn't exist, create a new user
      if (!user) {
        user = await userRepository.insert({
          name: username,
        });
      }

      // Get the start of the day for 7 days ago
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0); // Set to 00:00 AM

      // Check if the user has 7 sessions in the last 7 days
      const recentSessions = await sessionRepository.model.countDocuments({
        userId: user.id,
        startTime: { $gte: sevenDaysAgo, $lte: now },
        status: SessionStatus.ended,
        subtotal: { $exists: true },
      });

      // Determine if the session is free
      const isFreeSession = recentSessions >= 7;

      const session = await sessionRepository.insert({
        userId: user.id,
        organizationId: organization.id,
        startTime: now,
        totalCost: isFreeSession ? 0 : null,
        numberOfPersons,
        username: user.name,
      });

      if (session === null) {
        throw new InternalError();
      }

      res.created({ message: 'Session has been created', data: session });
    },
  );

  // Update session by Id for authenticated user
  public updateSession = asyncHandler(
    async (
      req: ParsedRequest<
        ISessionUpdateSchema,
        void,
        ISessionIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const session = needRecord(
        await sessionRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError('Session not found'),
      );

      if (updateBody.status === SessionStatus.cancelled) {
        updateBody.endTime = new Date();
      }

      const data = await sessionRepository.patchById(session.id, updateBody);

      res.ok({ message: 'Session has been updated', data });
    },
  );

  // Delete session by Id for authenticated user
  public deleteSession = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        void,
        ISessionIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      const session = needRecord(
        await sessionRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError('Session not found'),
      );

      await sessionRepository.deleteById(session.id);
      res.noContent({ message: 'Session deleted successfully' });
    },
  );

  public endSession = asyncHandler(
    async (
      req: ParsedRequest<
        void,
        void,
        ISessionIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      let session = needRecord(
        await sessionRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError(`Session not found`),
      );
      if (session.status !== SessionStatus.started) {
        throw new BadRequestError(`Session is already ${session.status}`);
      }

      // BadRequestErrorIf session is not free, calculate the cost
      session = await calculateCost(
        session,
        session.organization.sessionHourlyRate,
      );

      res.ok({ data: session, message: 'done' });
    },
  );

  public addDessert = asyncHandler(
    async (
      req: ParsedRequest<
        ISessionAddDessertSchema,
        void,
        ISessionIdSchema,
        IOrganizationHeaderSchema
      >,
      res: Response,
    ): Promise<void> => {
      const dessertId = req.valid.body.dessertId;
      const session = needRecord(
        await sessionRepository.findByIdWithOrg(
          req.valid.params.id,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError(`Session not found`),
      );
      if (session.status === SessionStatus.ended) {
        throw new BadRequestError('Session already ended');
      }

      const dessert = needRecord(
        await dessertRepository.findByIdWithOrg(
          dessertId,
          req.valid.headers['organization-id'],
        ),
        new NotFoundError(`Dessert with id: ${dessertId} not found`),
      );

      session.desserts.push({ dessert, ...req.valid.body });
      await session.save({ validateBeforeSave: false });
      res.ok({ data: session, message: 'done' });
    },
  );
}

export const sessionController = new SessionController();

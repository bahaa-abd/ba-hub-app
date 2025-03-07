import { Router } from 'express';
import validator from '../middlewares/validator';
import organizationSchema from '../schemas/organization.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { organizationController } from '../controllers/organization.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import paymentSchema from '../schemas/payment.schema';
import { paymentController } from '../controllers/payment.controller';
import { checkSubscriptionMiddleware } from '../middlewares/check-subscription';
const { USER, ADMIN } = RoleCode;

export class OrganizationRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // PROTECTED ROUTES
    this.router.use(
      validator({ headers: authSchema.auth }),
      authMiddleware.authenticateJWT,
    );

    // GET ALL ORGANIZATIONS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: organizationSchema.organizationAll }),
      organizationController.getOrganizations,
    );

    // GET ALL ORGANIZATIONS
    this.router.get(
      '/statistics',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        headers: organizationSchema.organizationHeader,
        query: organizationSchema.organizationStatistics,
      }),
      checkSubscriptionMiddleware,
      organizationController.statistics,
    );

    // CREATE ORGANIZATION
    this.router.post(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({ body: organizationSchema.organizationCreate }),
      organizationController.createOrganization,
    );

    // APPROVE ORGANIZATION BY ID
    this.router.post(
      '/:id/approve',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: organizationSchema.organizationId,
      }),
      organizationController.approve,
    );

    // REFUSE ORGANIZATION BY ID
    this.router.post(
      '/:id/refuse',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: organizationSchema.organizationId,
      }),
      organizationController.refuse,
    );

    // GET ALL PAYMENTS
    this.router.get(
      '/:id/payments',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({
        query: paymentSchema.paymentAll,
        params: organizationSchema.organizationId,
      }),
      paymentController.getPayments,
    );

    // GET ORGANIZATION BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: organizationSchema.organizationId }),
      organizationController.getOrganization,
    );

    // UPDATE ORGANIZATION BY ID
    this.router.patch(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: organizationSchema.organizationId,
        body: organizationSchema.organizationUpdate,
      }),
      organizationController.updateOrganization,
    );

    // DELETE ORGANIZATION BY ID
    this.router.delete(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: organizationSchema.organizationId }),
      organizationController.deleteOrganization,
    );
  }
}

export const organizationRoutes = new OrganizationRoutes();

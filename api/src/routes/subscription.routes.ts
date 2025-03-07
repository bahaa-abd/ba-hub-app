import { Router } from 'express';
import validator from '../middlewares/validator';
import subscriptionSchema from '../schemas/subscription.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { subscriptionController } from '../controllers/subscription.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import organizationSchema from '../schemas/organization.schema';
const { USER, ADMIN } = RoleCode;

export class SubscriptionRoutes {
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

    // GET ALL SUBSCRIPTIONS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: subscriptionSchema.subscriptionAll }),
      subscriptionController.getSubscriptions,
    );

    // GET ALL SUBSCRIPTIONS
    this.router.get(
      '/mine',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({
        query: subscriptionSchema.subscriptionAll,
        headers: organizationSchema.organizationHeader,
      }),
      subscriptionController.getMine,
    );

    // GET SUBSCRIPTION BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: subscriptionSchema.subscriptionId }),
      subscriptionController.getSubscription,
    );

    // CREATE SUBSCRIPTION
    this.router.post(
      '/',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ body: subscriptionSchema.subscriptionCreate }),
      subscriptionController.createSubscription,
    );

    // UPDATE SUBSCRIPTION BY ID
    this.router.patch(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: subscriptionSchema.subscriptionId,
        body: subscriptionSchema.subscriptionUpdate,
      }),
      subscriptionController.updateSubscription,
    );

    // DELETE SUBSCRIPTION BY ID
    this.router.delete(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: subscriptionSchema.subscriptionId }),
      subscriptionController.deleteSubscription,
    );
  }
}

export const subscriptionRoutes = new SubscriptionRoutes();

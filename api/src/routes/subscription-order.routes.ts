import { Router } from 'express';
import validator from '../middlewares/validator';
import subscriptionOrderSchema from '../schemas/subscription-order.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { subscriptionOrderController } from '../controllers/subscription-order.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import organizationSchema from '../schemas/organization.schema';
const { USER, ADMIN } = RoleCode;

export class SubscriptionOrderRoutes {
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

    // GET ALL SUBSCRIPTION_ORDERS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: subscriptionOrderSchema.subscriptionOrderAll }),
      subscriptionOrderController.getSubscriptionOrders,
    );

    // GET ALL SUBSCRIPTION_ORDERS
    this.router.get(
      '/mine',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({
        query: subscriptionOrderSchema.subscriptionOrderAll,
        headers: organizationSchema.organizationHeader,
      }),
      subscriptionOrderController.getMine,
    );

    // GET SUBSCRIPTION_ORDER BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: subscriptionOrderSchema.subscriptionOrderId }),
      subscriptionOrderController.getSubscriptionOrder,
    );

    // CREATE SUBSCRIPTION_ORDER
    this.router.post(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ body: subscriptionOrderSchema.subscriptionOrderCreate }),
      subscriptionOrderController.createSubscriptionOrder,
    );

    // APPROVE SUBSCRIPTION_ORDER BY ID
    this.router.post(
      '/:id/approve',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: subscriptionOrderSchema.subscriptionOrderId,
      }),
      subscriptionOrderController.approve,
    );

    // REFUSE SUBSCRIPTION_ORDER BY ID
    this.router.post(
      '/:id/refuse',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: subscriptionOrderSchema.subscriptionOrderId,
      }),
      subscriptionOrderController.refuse,
    );

    // UPDATE SUBSCRIPTION_ORDER BY ID
    this.router.patch(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: subscriptionOrderSchema.subscriptionOrderId,
        body: subscriptionOrderSchema.subscriptionOrderUpdate,
      }),
      subscriptionOrderController.updateSubscriptionOrder,
    );

    // DELETE SUBSCRIPTION_ORDER BY ID
    this.router.delete(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: subscriptionOrderSchema.subscriptionOrderId }),
      subscriptionOrderController.deleteSubscriptionOrder,
    );
  }
}

export const subscriptionOrderRoutes = new SubscriptionOrderRoutes();

import { Router } from 'express';
import validator from '../middlewares/validator';
import paymentSchema from '../schemas/payment.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { paymentController } from '../controllers/payment.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
const { USER, ADMIN } = RoleCode;

export class PaymentRoutes {
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

    // GET ALL PAYMENTS
    this.router.get(
      '/',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: paymentSchema.paymentAll }),
      paymentController.getPayments,
    );

    // GET PAYMENT BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: paymentSchema.paymentId }),
      paymentController.getPayment,
    );

    // CREATE PAYMENT
    this.router.post(
      '/',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ body: paymentSchema.paymentCreate }),
      paymentController.createPayment,
    );

    // UPDATE PAYMENT BY ID
    this.router.patch(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: paymentSchema.paymentId,
        body: paymentSchema.paymentUpdate,
      }),
      paymentController.updatePayment,
    );

    // DELETE PAYMENT BY ID
    this.router.delete(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: paymentSchema.paymentId }),
      paymentController.deletePayment,
    );
  }
}

export const paymentRoutes = new PaymentRoutes();

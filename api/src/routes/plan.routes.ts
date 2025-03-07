import { Router } from 'express';
import validator from '../middlewares/validator';
import planSchema from '../schemas/plan.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { planController } from '../controllers/plan.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
const { USER, ADMIN } = RoleCode;

export class PlanRoutes {
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

    // GET ALL PLANS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: planSchema.planAll }),
      planController.getPlans,
    );

    // GET PLAN BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: planSchema.planId }),
      planController.getPlan,
    );

    // CREATE PLAN
    this.router.post(
      '/',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ body: planSchema.planCreate }),
      planController.createPlan,
    );

    // UPDATE PLAN BY ID
    this.router.patch(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: planSchema.planId, body: planSchema.planUpdate }),
      planController.updatePlan,
    );

    // DELETE PLAN BY ID
    this.router.delete(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: planSchema.planId }),
      planController.deletePlan,
    );
  }
}

export const planRoutes = new PlanRoutes();

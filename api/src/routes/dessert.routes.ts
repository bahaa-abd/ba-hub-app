import { Router } from 'express';
import validator from '../middlewares/validator';
import dessertSchema from '../schemas/dessert.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { dessertController } from '../controllers/dessert.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { checkSubscriptionMiddleware } from '../middlewares/check-subscription';
import organizationSchema from '../schemas/organization.schema';
const { USER, ADMIN } = RoleCode;

export class DessertRoutes {
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

    this.router.use(
      validator({
        headers: organizationSchema.organizationHeader,
      }),
    );

    // GET ALL DESSERTS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({
        query: dessertSchema.dessertAll,
        headers: organizationSchema.organizationHeader,
      }),
      dessertController.getDesserts,
    );

    this.router.use(checkSubscriptionMiddleware);

    // GET DESSERT BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: dessertSchema.dessertId,
        headers: organizationSchema.organizationHeader,
      }),
      dessertController.getDessert,
    );

    // CREATE DESSERT
    this.router.post(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        body: dessertSchema.dessertCreate,
        headers: organizationSchema.organizationHeader,
      }),
      dessertController.createDessert,
    );

    // UPDATE DESSERT BY ID
    this.router.patch(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: dessertSchema.dessertId,
        body: dessertSchema.dessertUpdate,
        headers: organizationSchema.organizationHeader,
      }),
      dessertController.updateDessert,
    );

    // DELETE DESSERT BY ID
    this.router.delete(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: dessertSchema.dessertId,
        headers: organizationSchema.organizationHeader,
      }),
      dessertController.deleteDessert,
    );
  }
}

export const dessertRoutes = new DessertRoutes();

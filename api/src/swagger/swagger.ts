import * as swaggerJsdoc from 'swagger-jsdoc';
import {
  SubscriptionOrder,
  createSubscriptionOrder,
  updateSubscriptionOrder,
} from './routes/subscription-order.swagger';
import {
  Dessert,
  createDessert,
  updateDessert,
} from './routes/dessert.swagger';
import {
  Payment,
  createPayment,
  updatePayment,
} from './routes/payment.swagger';
import { Plan, createPlan, updatePlan } from './routes/plan.swagger';
import {
  Subscription,
  createSubscription,
  updateSubscription,
} from './routes/subscription.swagger';
import {
  Session,
  createSession,
  addDessert,
  updateSession,
} from './routes/session.swagger';
import {
  Organization,
  approveOrganization,
  createOrganization,
  refuseOrganization,
  updateOrganization,
} from './routes/organization.swagger';
import { signUp } from './routes/auth.swagger';
import { env_vars } from '../config';
import {
  DuplicateEmail,
  Forbidden,
  NotFound,
  Unauthorized,
  Error,
} from './components';
import { createUser, updateMe, User } from './routes/users.swagger';
const options = {
  url: '',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
      description:
        'This is an API store application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: `${
          env_vars.env === 'development'
            ? `http://localhost:${env_vars.port}`
            : env_vars.apiUrl
        }/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        SubscriptionOrder,
        createSubscriptionOrder,
        updateSubscriptionOrder,
        Dessert,
        createDessert,
        updateDessert,
        Payment,
        createPayment,
        updatePayment,
        Plan,
        createPlan,
        updatePlan,
        Subscription,
        createSubscription,
        updateSubscription,
        Session,
        createSession,
        updateSession,
        addDessert,
        Organization,
        createOrganization,
        updateOrganization,
        refuseOrganization,
        approveOrganization,
        signUp,
        createUser,
        updateMe,
        User,
        Error,
      },
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the token : abcde12345".',
        },
      },
      responses: {
        DuplicateEmail,
        Forbidden,
        NotFound,
        Unauthorized,
        201: {
          description: 'created',
        },
        200: {
          description: 'ok',
        },
        204: {
          description: 'No content',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  apis: ['./dist/swagger/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;

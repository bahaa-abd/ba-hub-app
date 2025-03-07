/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management and retrieval
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a subscription
 *     description: ADMIN can create subscription.
 *     tags: [Subscriptions]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createSubscription'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/Subscription'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all subscriptions
 *     description: USER,ADMIN can retrieve all subscriptions.
 *     tags: [Subscriptions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of subscriptions
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /subscriptions/mine:
 *   get:
 *     summary: Get all subscriptions
 *     description: USER,ADMIN can retrieve all subscriptions.
 *     tags: [Subscriptions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of subscriptions
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     summary: Get a subscription
 *     description: USER,ADMIN can use this router.
 *     tags: [Subscriptions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/Subscription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a subscription
 *     description: ADMIN can use this router.
 *     tags: [Subscriptions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateSubscription'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/Subscription'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  subscription.
 *     description: ADMIN can use this router.
 *     tags: [Subscriptions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export const Subscription = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    expiresDate: { type: 'date' },
    startsDate: { type: 'date' },
    status: {
      type: 'string',
      enum: ['pending', 'active', 'expired', 'cancelled'],
    },
    plan: { type: 'string' },
    organization: { type: 'string' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example
    expiresDate: '2024-11-24T16:35:04.438Z',

    startsDate: '2024-11-24T16:35:04.438Z',

    status: 'pending',

    planId: '673c40cd59e293827f79e398',

    organizationId: '673c40cd59e293827f79e398',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
export const createSubscription = {
  type: 'object',
  properties: {
    // create property
    expiresDate: { type: 'date' },
    status: {
      type: 'string',
      enum: ['pending', 'active', 'expired', 'cancelled'],
    },
    planId: { type: 'string' },
    organizationId: { type: 'string' },
    price: { type: 'number' },
  },
  example: {
    // create property example
    expiresDate: '2024-11-24T16:35:04.438Z',

    status: 'pending',

    planId: '673c40cd59e293827f79e398',

    organizationId: '673c40cd59e293827f79e398',

    price: 2000,
  },
  required: [
    // required property
    'expiresDate',

    'startsDate',

    'plan',

    'organization',
  ],
};
export const updateSubscription = {
  type: 'object',
  properties: {
    // update property
    expiresDate: { type: 'date' },
    status: {
      type: 'string',
      enum: ['pending', 'active', 'expired', 'cancelled'],
    },
    planId: { type: 'string' },
    organizationId: { type: 'string' },
  },
  example: {
    // update property example
    expiresDate: '2024-11-24T16:35:04.438Z',

    status: 'pending',

    planId: '673c40cd59e293827f79e398',

    organizationId: '673c40cd59e293827f79e398',
  },
};

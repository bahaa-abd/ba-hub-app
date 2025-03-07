/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management and retrieval
 */

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a organization
 *     description: USER can create organization.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOrganization'
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
 *                     $ref: '#/components/schemas/Organization'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   getSubscriptionOrder:
 *     summary: Get all organizations
 *     description: USER,ADMIN can retrieve all organizations.
 *     tags: [Organizations]
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
 *         description: Maximum number of organizations
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
 *                     $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /organizations/statistics:
 *   get:
 *     summary: Get organization statistics
 *     description: USER can retrieve organization statistics.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *         description: from date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *         description: to date
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
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
 *                     $ref: '#/components/schemas/Statistics'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get a organization
 *     description: USER,ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 *                     $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a organization
 *     description: USER,ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateOrganization'
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
 *                     $ref: '#/components/schemas/Organization'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  organization.
 *     description: ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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

/**
 * @swagger
 * /organizations/{id}/payments:
 *   get:
 *     summary: Get all payments
 *     description: USER,ADMIN can retrieve all payments.
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: the id of associated organization
 *         required: true
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
 *         description: Maximum number of payments
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
 *                     $ref: '#/components/schemas/Payment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /organizations/{id}/approve:
 *   post:
 *     summary: Approve a organization
 *     description: ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /organizations/{id}/refuse:
 *   post:
 *     summary: Refuse a organization
 *     description: ADMIN can use this router.
 *     tags: [Organizations]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization id
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export const Statistics = {
  type: 'object',
  properties: {
    totalSessions: { type: 'number' },
    sessionsByStatus: {
      type: 'object',
      additionalProperties: { type: 'number' },
    },
    revenueByDay: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string', format: 'date' },
          totalRevenue: { type: 'number' },
        },
      },
    },
    dessertsByDay: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string', format: 'date' },
          desserts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                totalSold: { type: 'number' },
                totalRevenue: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },
  example: {
    totalSessions: 120,
    sessionsByStatus: {
      started: 50,
      cancelled: 10,
      ended: 30,
    },
    revenueByDay: [
      { date: '2024-02-17', totalRevenue: 50000 },
      { date: '2024-02-18', totalRevenue: 48000 },
    ],
    dessertsByDay: [
      {
        date: '2024-02-17',
        desserts: [
          { name: 'Chocolate Cake', totalSold: 15, totalRevenue: 45000 },
          { name: 'Ice Cream', totalSold: 10, totalRevenue: 20000 },
        ],
      },
      {
        date: '2024-02-18',
        desserts: [{ name: 'Brownie', totalSold: 12, totalRevenue: 36000 }],
      },
    ],
  },
};

export const Organization = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    recentSubscription: { type: 'string' },
    status: { type: 'string', enum: ['approved', 'refused', 'pending'] },
    user: { type: 'string' },
    sessionHourlyRate: { type: 'number' },
    name: { type: 'string' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example
    recentSubscriptionId: '673c40cd59e293827f79e398',

    status: 'approved',

    userId: '673c40cd59e293827f79e398',

    sessionHourlyRate: 2000,

    name: 'sunlight',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};

export const createOrganization = {
  type: 'object',
  properties: {
    // create property

    userId: { type: 'string' },
    sessionHourlyRate: { type: 'number' },
    name: { type: 'string' },
  },
  example: {
    // create property example

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
  required: [
    // required property
    'recentSubscription',

    'name',
  ],
};

export const updateOrganization = {
  type: 'object',
  properties: {
    // update property

    sessionHourlyRate: { type: 'number' },
    name: { type: 'string' },
  },
  example: {
    // update property example

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
};

export const approveOrganization = {
  type: 'object',
  properties: {},
  example: {
    // approve property example
    status: 'approved',

    userId: '673c40cd59e293827f79e398',

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
};

export const refuseOrganization = {
  type: 'object',
  properties: {},
  example: {
    // refuse property example
    status: 'refused',

    userId: '673c40cd59e293827f79e398',

    sessionHourlyRate: 2000,

    name: 'sunlight',
  },
};

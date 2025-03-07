/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: Plan management and retrieval
 */

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create a plan
 *     description: ADMIN can create plan.
 *     tags: [Plans]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createPlan'
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
 *                     $ref: '#/components/schemas/Plan'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all plans
 *     description: USER,ADMIN can retrieve all plans.
 *     tags: [Plans]
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
 *         description: Maximum number of plans
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
 *                     $ref: '#/components/schemas/Plan'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Get a plan
 *     description: USER,ADMIN can use this router.
 *     tags: [Plans]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan id
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
 *                     $ref: '#/components/schemas/Plan'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a plan
 *     description: ADMIN can use this router.
 *     tags: [Plans]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updatePlan'
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
 *                     $ref: '#/components/schemas/Plan'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  plan.
 *     description: ADMIN can use this router.
 *     tags: [Plans]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan id
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

export const Plan = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    description: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    title: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    duration: { type: 'string', enum: ['month', 'year', 'free'] },
    price: { type: 'number' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example

    description: {
      ar: '',
      en: '',
    },

    title: {
      ar: '',
      en: '',
    },

    duration: 'month',

    price: 2000,

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
export const createPlan = {
  type: 'object',
  properties: {
    // create property
    description: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    title: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    duration: { type: 'string', enum: ['month', 'year', 'free'] },
    price: { type: 'number' },
  },
  example: {
    // create property example

    description: {
      ar: '',
      en: '',
    },

    title: {
      ar: '',
      en: '',
    },

    duration: 'month',

    price: 2000,
  },
  required: [
    // required property

    'price',

    'title',
  ],
};
export const updatePlan = {
  type: 'object',
  properties: {
    // update property
    description: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    title: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    duration: { type: 'string', enum: ['month', 'year', 'free'] },
    price: { type: 'number' },
  },
  example: {
    // update property example

    description: {
      ar: '',
      en: '',
    },

    title: {
      ar: '',
      en: '',
    },

    duration: 'month',

    price: 2000,
  },
};

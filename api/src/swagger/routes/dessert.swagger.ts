/**
 * @swagger
 * tags:
 *   name: Desserts
 *   description: Dessert management and retrieval
 */

/**
 * @swagger
 * /desserts:
 *   post:
 *     summary: Create a dessert
 *     description: USER can create dessert.
 *     tags: [Desserts]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createDessert'
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
 *                     $ref: '#/components/schemas/Dessert'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all desserts
 *     description: USER,ADMIN can retrieve all desserts.
 *     tags: [Desserts]
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
 *         description: Maximum number of desserts
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
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: drink or meal
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
 *                     $ref: '#/components/schemas/Dessert'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /desserts/{id}:
 *   get:
 *     summary: Get a dessert
 *     description: USER,ADMIN can use this router.
 *     tags: [Desserts]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dessert id
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
 *                     $ref: '#/components/schemas/Dessert'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a dessert
 *     description: USER can use this router.
 *     tags: [Desserts]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dessert id
 *       - in: header
 *         name: organization-id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the organization the session belongs to.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateDessert'
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
 *                     $ref: '#/components/schemas/Dessert'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  dessert.
 *     description: USER can use this router.
 *     tags: [Desserts]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Dessert id
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
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export const Dessert = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    name: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    organization: { type: 'string' },
    type: { type: 'string', enum: ['drink', 'meal'] },
    price: { type: 'number' },
  },
  example: {
    id: '5ebac534954b54139806c112',
    // property example
    name: {
      ar: 'حليب',
      en: 'milk',
    },
    organizationId: '673c40cd59e293827f79e398',

    type: 'drink',

    price: 2000,

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
export const createDessert = {
  type: 'object',
  properties: {
    // create property
    name: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    type: { type: 'string', enum: ['drink', 'meal'] },
    price: { type: 'number' },
  },
  example: {
    // create property example
    name: {
      ar: 'حليب',
      en: 'milk',
    },
    type: 'drink',

    price: 2000,
  },
  required: [
    // required property

    'name',

    'organization',

    'price',
  ],
};
export const updateDessert = {
  type: 'object',
  properties: {
    // update property
    name: {
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' },
      },
    },
    type: { type: 'string', enum: ['drink', 'meal'] },
    price: { type: 'number' },
  },
  example: {
    // update property example
    name: {
      ar: 'حليب',
      en: 'milk',
    },
    type: 'drink',

    price: 2000,
  },
};

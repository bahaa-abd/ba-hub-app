import { localString } from './common';

import { objectId } from './common';

import { DessertType } from './../utils/enum';

import { object, z, string, type TypeOf } from 'zod';
import { orderColumn, orderDirection, page, pageSize } from './common';

const dessertIdSchema = object({
  id: objectId,
});

export type IDessertIdSchema = TypeOf<typeof dessertIdSchema>;

const dessertAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  type: z.nativeEnum(DessertType).optional(),
});

export type IDessertAllSchema = TypeOf<typeof dessertAllSchema>;

const dessertCreateSchema = object({
  // <creating-property-create-schema />
  name: localString,

  type: z.nativeEnum(DessertType),

  price: z.number(),
}).strict();

export type IDessertCreateSchema = TypeOf<typeof dessertCreateSchema>;

const dessertUpdateSchema = object({
  // <creating-property-update-schema />
  name: localString.optional(),

  type: z.nativeEnum(DessertType).optional(),

  price: z.number().optional(),
}).strict();

export type IDessertUpdateSchema = TypeOf<typeof dessertUpdateSchema>;

export default {
  dessertId: dessertIdSchema,
  dessertAll: dessertAllSchema,
  dessertCreate: dessertCreateSchema,
  dessertUpdate: dessertUpdateSchema,
};

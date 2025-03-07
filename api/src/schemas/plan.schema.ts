import { stringToDate } from './common';

import { localString } from './common';

import { PlanDuration } from './../utils/enum';

import { object, z, string, type TypeOf } from 'zod';
import {
  objectId,
  orderColumn,
  orderDirection,
  page,
  pageSize,
} from './common';

const planIdSchema = object({
  id: objectId,
});

export type IPlanIdSchema = TypeOf<typeof planIdSchema>;

const planAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
});

export type IPlanAllSchema = TypeOf<typeof planAllSchema>;

const planCreateSchema = object({
  // <creating-property-create-schema />
  description: localString.optional(),

  title: localString,
  duration: z.nativeEnum(PlanDuration),
  price: z.number(),
}).strict();

export type IPlanCreateSchema = TypeOf<typeof planCreateSchema>;

const planUpdateSchema = object({
  // <creating-property-update-schema />
  description: localString.optional(),

  title: localString.optional(),

  duration: z.nativeEnum(PlanDuration).optional(),
  price: z.number().optional(),
}).strict();

export type IPlanUpdateSchema = TypeOf<typeof planUpdateSchema>;

export default {
  planId: planIdSchema,
  planAll: planAllSchema,
  planCreate: planCreateSchema,
  planUpdate: planUpdateSchema,
};

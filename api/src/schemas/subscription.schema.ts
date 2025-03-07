import { objectId } from './common';

import { SubscriptionStatus } from './../utils/enum';

import { object, z, string, type TypeOf } from 'zod';
import {
  orderColumn,
  orderDirection,
  page,
  pageSize,
  stringToDate,
} from './common';

const subscriptionIdSchema = object({
  id: objectId,
});

export type ISubscriptionIdSchema = TypeOf<typeof subscriptionIdSchema>;

const subscriptionAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  organizationId: objectId.optional(),
});

export type ISubscriptionAllSchema = TypeOf<typeof subscriptionAllSchema>;

const subscriptionCreateSchema = object({
  // <creating-property-create-schema />

  status: z.nativeEnum(SubscriptionStatus).optional(),

  planId: objectId,

  organizationId: objectId,

  expiresDate: stringToDate.optional(),

  price: z.number().optional(),
}).strict();

export type ISubscriptionCreateSchema = TypeOf<typeof subscriptionCreateSchema>;

const subscriptionUpdateSchema = object({
  // <creating-property-update-schema />

  status: z.nativeEnum(SubscriptionStatus).optional(),

  planId: objectId.optional(),

  organizationId: objectId.optional(),

  expiresDate: stringToDate.optional(),
}).strict();

export type ISubscriptionUpdateSchema = TypeOf<typeof subscriptionUpdateSchema>;

export default {
  subscriptionId: subscriptionIdSchema,
  subscriptionAll: subscriptionAllSchema,
  subscriptionCreate: subscriptionCreateSchema,
  subscriptionUpdate: subscriptionUpdateSchema,
};

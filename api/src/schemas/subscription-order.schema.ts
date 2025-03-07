import { objectId } from './common';

import { object, string, type TypeOf } from 'zod';
import { orderColumn, orderDirection, page, pageSize } from './common';

const subscriptionOrderIdSchema = object({
  id: objectId,
});

export type ISubscriptionOrderIdSchema = TypeOf<
  typeof subscriptionOrderIdSchema
>;

const subscriptionOrderAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  organizationId: objectId.optional(),
});

export type ISubscriptionOrderAllSchema = TypeOf<
  typeof subscriptionOrderAllSchema
>;

const subscriptionOrderCreateSchema = object({
  // <creating-property-create-schema />

  organizationId: objectId,

  planId: objectId,
}).strict();

export type ISubscriptionOrderCreateSchema = TypeOf<
  typeof subscriptionOrderCreateSchema
>;

const subscriptionOrderUpdateSchema = object({
  // <creating-property-update-schema />

  organizationId: objectId.optional(),

  planId: objectId.optional(),
}).strict();

export type ISubscriptionOrderUpdateSchema = TypeOf<
  typeof subscriptionOrderUpdateSchema
>;

export default {
  subscriptionOrderId: subscriptionOrderIdSchema,
  subscriptionOrderAll: subscriptionOrderAllSchema,
  subscriptionOrderCreate: subscriptionOrderCreateSchema,
  subscriptionOrderUpdate: subscriptionOrderUpdateSchema,
};

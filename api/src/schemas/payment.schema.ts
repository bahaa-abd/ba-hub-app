import { stringToDate } from './common';

import { objectId } from './common';

import { PaymentStatus } from './../utils/enum';

import { object, z, string, type TypeOf } from 'zod';
import { orderColumn, orderDirection, page, pageSize } from './common';

const paymentIdSchema = object({
  id: objectId,
});

export type IPaymentIdSchema = TypeOf<typeof paymentIdSchema>;

const paymentAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
  organizationId: objectId.optional(),
});

export type IPaymentAllSchema = TypeOf<typeof paymentAllSchema>;

const paymentCreateSchema = object({
  // <creating-property-create-schema />

  status: z.nativeEnum(PaymentStatus).optional(),

  amount: z.number(),

  subscriptionId: objectId,
}).strict();

export type IPaymentCreateSchema = TypeOf<typeof paymentCreateSchema>;

const paymentUpdateSchema = object({
  // <creating-property-update-schema />

  status: z.nativeEnum(PaymentStatus).optional(),

  amount: z.number().optional(),

  subscriptionId: objectId.optional(),
}).strict();

export type IPaymentUpdateSchema = TypeOf<typeof paymentUpdateSchema>;

export default {
  paymentId: paymentIdSchema,
  paymentAll: paymentAllSchema,
  paymentCreate: paymentCreateSchema,
  paymentUpdate: paymentUpdateSchema,
};

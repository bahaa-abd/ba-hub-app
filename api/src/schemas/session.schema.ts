import { SessionStatus } from './../utils/enum';

import { stringToDate } from './common';

import { objectId } from './common';
import { z, type TypeOf } from 'zod';
import { orderColumn, orderDirection, page, pageSize } from './common';

const sessionIdSchema = z.object({
  id: objectId,
});

export type ISessionIdSchema = TypeOf<typeof sessionIdSchema>;

const sessionAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
  status: z.nativeEnum(SessionStatus).optional(),
});

export type ISessionAllSchema = TypeOf<typeof sessionAllSchema>;

const sessionCreateSchema = z
  .object({
    // <creating-property-create-schema />
    numberOfPersons: z.number(),

    username: z.string(),
  })
  .strict();

export type ISessionCreateSchema = TypeOf<typeof sessionCreateSchema>;

const sessionUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    numberOfPersons: z.number().optional(),

    status: z.nativeEnum(SessionStatus).optional(),
    subtotal: z.number().optional(),
    additionalCost: z.number().optional(),
    totalCost: z.number().optional(),
    endTime: stringToDate.optional(),
  })
  .strict();

export type ISessionUpdateSchema = TypeOf<typeof sessionUpdateSchema>;

const sessionAddDessertSchema = z
  .object({
    dessertId: objectId,
    count: z.number(),
  })
  .strict();

export type ISessionAddDessertSchema = TypeOf<typeof sessionAddDessertSchema>;

export default {
  sessionId: sessionIdSchema,
  sessionAll: sessionAllSchema,
  sessionCreate: sessionCreateSchema,
  sessionUpdate: sessionUpdateSchema,
  sessionAddDessert: sessionAddDessertSchema,
};

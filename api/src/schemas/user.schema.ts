import { stringToDate } from './common';

import { UserStatus } from './../utils/enum';
import { z, TypeOf } from 'zod';
import {
  objectId,
  orderColumn,
  orderDirection,
  page,
  pageSize,
} from './common';

const userIdSchema = z.object({
  id: objectId,
});

export type IUserIdSchema = TypeOf<typeof userIdSchema>;

const userUpdateSchema = z
  .object({
    // <creating-property-update-schema />
    status: z.nativeEnum(UserStatus).optional(),
  })
  .strict();

export type IUserUpdateSchema = TypeOf<typeof userUpdateSchema>;

const userUpdateMeSchema = z
  .object({
    // <creating-property-update-schema />
    name: z.string().optional(),
    email: z.string().email().optional(),
  })

  .strict();

export type IUserUpdateMeSchema = TypeOf<typeof userUpdateMeSchema>;

const userAllSchema = z.object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: z.string().optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),
});

export type IUserAllSchema = TypeOf<typeof userAllSchema>;

export default {
  userId: userIdSchema,
  updateUser: userUpdateSchema,
  updateMeSchema: userUpdateMeSchema,
  userAll: userAllSchema,
};

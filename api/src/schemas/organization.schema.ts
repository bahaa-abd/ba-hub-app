import { stringToDate } from './common';

import { OrgStatus } from './../utils/enum';

import { object, z, string, type TypeOf } from 'zod';
import {
  objectId,
  orderColumn,
  orderDirection,
  page,
  pageSize,
} from './common';

const organizationIdSchema = object({
  id: objectId,
});

export type IOrganizationIdSchema = TypeOf<typeof organizationIdSchema>;

const organizationStatisticsSchema = object({
  fromDate: stringToDate.optional(),
  toDate: stringToDate.optional(),
});

export type IOrganizationStatisticsSchema = TypeOf<
  typeof organizationStatisticsSchema
>;

const organizationAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
  dateFrom: stringToDate.optional(),
  dateTo: stringToDate.optional(),

  status: z.nativeEnum(OrgStatus).optional(),
});

export type IOrganizationAllSchema = TypeOf<typeof organizationAllSchema>;

const organizationCreateSchema = object({
  // <creating-property-create-schema />

  userId: objectId.optional(),

  sessionHourlyRate: z.number().optional(),

  name: z.string(),
}).strict();

export type IOrganizationCreateSchema = TypeOf<typeof organizationCreateSchema>;

const organizationUpdateSchema = object({
  // <creating-property-update-schema />

  sessionHourlyRate: z.number().optional().optional(),

  name: z.string().optional(),
}).strict();

export type IOrganizationUpdateSchema = TypeOf<typeof organizationUpdateSchema>;

const organizationHeaderSchema = z.object({
  'organization-id': objectId,
});

export type IOrganizationHeaderSchema = TypeOf<typeof organizationHeaderSchema>;

export default {
  organizationId: organizationIdSchema,
  organizationAll: organizationAllSchema,
  organizationCreate: organizationCreateSchema,
  organizationUpdate: organizationUpdateSchema,
  organizationHeader: organizationHeaderSchema,
  organizationStatistics: organizationStatisticsSchema,
};

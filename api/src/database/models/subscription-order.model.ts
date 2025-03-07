import { SubscriptionOrderStatus } from './../../utils/enum';

import { IOrganization } from './organization.model';

import { IPlan } from './plan.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface ISubscriptionOrder extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  status?: SubscriptionOrderStatus;

  organizationId: IOrganization['_id'];
  organization: IOrganization;

  planId: IPlan['_id'];
  plan: IPlan;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const subscriptionOrderSchema: Schema = new Schema<ISubscriptionOrder>(
  {
    // <creating-property-schema />
    status: {
      type: String,
      enum: Object.values(SubscriptionOrderStatus),
      default: SubscriptionOrderStatus.pending,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'SubscriptionOrder',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

subscriptionOrderSchema.virtual('plan', {
  localField: 'planId',
  foreignField: '_id',
  ref: 'Plan',
  justOne: true,
  match: { deletedAt: null },
});

subscriptionOrderSchema.virtual('organization', {
  localField: 'organizationId',
  foreignField: '_id',
  ref: 'Organization',
  justOne: true,
  match: { deletedAt: null },
});

export default model<ISubscriptionOrder>(
  'SubscriptionOrder',
  subscriptionOrderSchema,
);

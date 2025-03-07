import { SubscriptionStatus } from './../../utils/enum';

import { IPlan } from './plan.model';

import { IOrganization } from './organization.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';
import { IPayment } from './payment.model';

export interface ISubscription extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  expiresDate: Date;
  startsDate?: Date;
  status: SubscriptionStatus;
  planId: IPlan['_id'];
  plan: IPlan;
  organizationId: IOrganization['_id'];
  organization: IOrganization;
  payment: IPayment;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const subscriptionSchema: Schema = new Schema<ISubscription>(
  {
    // <creating-property-schema />
    expiresDate: {
      type: Date,
      default: null,
    },
    startsDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.pending,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Subscription',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

subscriptionSchema.virtual('organization', {
  localField: 'organizationId',
  foreignField: '_id',
  ref: 'Organization',
  justOne: true,
  match: { deletedAt: null },
});

subscriptionSchema.virtual('plan', {
  localField: 'planId',
  foreignField: '_id',
  ref: 'Plan',
  justOne: true,
  match: { deletedAt: null },
});

subscriptionSchema.virtual('payment', {
  localField: '_id',
  foreignField: 'subscriptionId',
  ref: 'Payment',
  justOne: true,
  match: { deletedAt: null },
});

export default model<ISubscription>('Subscription', subscriptionSchema);

import { IOrganization } from './organization.model';

import { PaymentStatus } from './../../utils/enum';

import { ISubscription } from './subscription.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IPayment extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  organizationId?: IOrganization['_id'];
  organization?: IOrganization;

  status?: PaymentStatus;

  amount: number;

  subscriptionId: ISubscription['_id'];
  subscription: ISubscription;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const paymentSchema: Schema = new Schema<IPayment>(
  {
    // <creating-property-schema />
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.pending,
    },
    amount: {
      type: Number,
      default: 0,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Payment',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

paymentSchema.virtual('subscription', {
  localField: 'subscriptionId',
  foreignField: '_id',
  ref: 'Subscription',
  justOne: true,
  match: { deletedAt: null },
});

paymentSchema.virtual('organization', {
  localField: 'organizationId',
  foreignField: '_id',
  ref: 'Organization',
  justOne: true,
  match: { deletedAt: null },
});

export default model<IPayment>('Payment', paymentSchema);

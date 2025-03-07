import { type ILocalString, localStringSchema } from './../../utils/types';

import { IOrganization } from './organization.model';

import mongoose from 'mongoose';

import { DessertType } from './../../utils/enum';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IDessert extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  name: ILocalString;
  organizationId?: IOrganization['_id'];
  organization?: IOrganization;

  type: DessertType;

  price: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const dessertSchema: Schema = new Schema<IDessert>(
  {
    // <creating-property-schema />
    name: {
      type: localStringSchema,
      of: String,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },

    type: {
      type: String,
      enum: Object.values(DessertType),
    },

    price: {
      type: Number,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Dessert',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

dessertSchema.virtual('organization', {
  localField: 'organizationId',
  foreignField: '_id',
  ref: 'Organization',
  justOne: true,
  match: { deletedAt: null },
});

export default model<IDessert>('Dessert', dessertSchema);

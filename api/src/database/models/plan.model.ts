import { type ILocalString, localStringSchema } from './../../utils/types';

import { PlanDuration } from './../../utils/enum';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IPlan extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  description?: ILocalString;
  title: ILocalString;
  duration: PlanDuration;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const planSchema: Schema = new Schema<IPlan>(
  {
    // <creating-property-schema />
    description: {
      type: localStringSchema,
      of: String,
    },

    title: {
      type: localStringSchema,
      of: String,
    },

    duration: {
      type: String,
      enum: Object.values(PlanDuration),
    },
    price: {
      type: Number,
      default: 0,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Plan',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

export default model<IPlan>('Plan', planSchema);

import { IDessert } from './dessert.model';

import { SessionStatus } from './../../utils/enum';

import { IOrganization } from './organization.model';

import { IUser } from './user.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface ISession extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  numberOfPersons: number;

  desserts: Array<{
    dessertId: IDessert['_id'];
    dessert: IDessert;
    count: number;
  }>;

  status?: SessionStatus;

  subtotal?: number;

  additionalCost: number;

  organizationId: IOrganization['_id'];
  organization: IOrganization;
  userId?: IUser['_id'];
  user?: IUser;

  totalCost?: number;

  endTime: Date;
  startTime: Date;
  username?: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  calculateCost(organizationHourlyRate: number): {
    total: number;
    subtotal: number;
  };
}

const sessionSchema: Schema = new Schema<ISession>(
  {
    // <creating-property-schema />
    numberOfPersons: {
      type: Number,
    },
    desserts: {
      type: [
        {
          dessertId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dessert',
          },
          count: {
            type: Number,
          },
          _id: false,
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      default: SessionStatus.started,
    },

    subtotal: {
      type: Number,
    },
    additionalCost: {
      type: Number,
      default: 0,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    totalCost: {
      type: Number,
      default: null,
    },
    endTime: {
      type: Date,
    },
    startTime: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      index: 'text',
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Session',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

sessionSchema.virtual('user', {
  localField: 'userId',
  foreignField: '_id',
  ref: 'User',
  justOne: true,
  match: { deletedAt: null },
});

sessionSchema.virtual('organization', {
  localField: 'organizationId',
  foreignField: '_id',
  ref: 'Organization',
  justOne: true,
  match: { deletedAt: null },
});

sessionSchema.virtual('desserts.dessert', {
  localField: 'desserts.dessertId',
  foreignField: '_id',
  ref: 'Dessert',
  justOne: true,
  match: { deletedAt: null },
});

export default model<ISession>('Session', sessionSchema);

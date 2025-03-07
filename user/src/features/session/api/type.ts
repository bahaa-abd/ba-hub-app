import { DessertType, SessionStatus } from "constants/enums";
import { Dayjs } from "dayjs";
import { Organization } from "features/organizations";
import { User } from "features/user";
import { APIListParams, LocalString, Payload } from "types/api";

export type Session = {
  id: string;
  // <creating-property-interface />
  desserts: Array<{
    dessertId: string;
    dessert: Dessert;
    count: number;
  }>;
  status: SessionStatus;
  subtotal?: number;
  additionalCost: number;
  organizationId: string;
  organization: Organization;
  user?: User;
  userId: string;
  totalCost?: number;
  endTime?: string;
  startTime: string;
  username?: string;
  createdAt: string;
  updatedAt: string;
};

export type SessionAllParams = APIListParams &
  Partial<{
    status: SessionStatus;
    dateFrom: Dayjs;
    dateTo: Dayjs;
  }>;

export type SessionAction = {
  username: string;
  numberOfPersons: number;
};

export type SessionAddPayload = Payload<undefined, SessionAction>;
export type SessionEditPayload = SessionAddPayload;
export type SessionSelect = Pick<Session, "id" | "username">;

export type Dessert = {
  id: string;
  name: LocalString;
  type: DessertType;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

import { PaymentStatus, SubscriptionStatus } from "constants/enums";
import { Organization } from "features/organizations";
import { Plan } from "features/plan";
import { APIListParams, Payload } from "types/api";

export type Subscription = {
  id: string;
  expiresDate: string;
  startsDate?: string;
  status: SubscriptionStatus;
  organizationId: Organization["id"];
  organization: Organization;
  payment: Payment;
  planId: Plan["id"];
  plan: Plan;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionAllParams = APIListParams;

export type SubscriptionAction = {
  organizationId: string;
  planId: string;
};

export type SubscriptionAddPayload = Payload<undefined, SubscriptionAction>;
export type SubscriptionEditPayload = SubscriptionAddPayload;
export type SubscriptionSelect = Pick<Subscription, "id">;

export interface Payment {
  id: string;
  organizationId: Organization["id"];
  organization?: Organization;
  status: PaymentStatus;
  amount: number;
  subscriptionId: Subscription["id"];
  subscription?: Subscription;
  createdAt: string;
  updatedAt: string;
}

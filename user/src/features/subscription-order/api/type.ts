import { SubscriptionOrderStatus } from "constants/enums";
import { Organization } from "features/organizations";
import { Plan } from "features/plan";
import { APIListParams, Payload } from "types/api";

export type SubscriptionOrder = {
  id: string;
  status?: SubscriptionOrderStatus;
  organizationId: string;
  organization: Organization;
  planId: string;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionOrderAllParams = APIListParams;

export type SubscriptionOrderAction = {
  organizationId: string;
  planId: string;
};

export type SubscriptionOrderAddPayload = Payload<
  undefined,
  SubscriptionOrderAction
>;
export type SubscriptionOrderEditPayload = SubscriptionOrderAddPayload;
export type SubscriptionOrderSelect = Pick<SubscriptionOrder, "id">;

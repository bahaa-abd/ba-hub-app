import { PlanDuration } from "constants/enums";
import { APIListParams, LocalString, Payload } from "types/api";

export type Plan = {
  id: string;
  duration: PlanDuration;
  price: number;
  title: LocalString;
  description: LocalString;
  createdAt: string;
  updatedAt: string;
};

export type PlanAllParams = APIListParams;

export type PlanAction = {
  duration: PlanDuration;
  price: number;
  title: LocalString;
  description: LocalString;
};

export type PlanAddPayload = Payload<undefined, PlanAction>;
export type PlanEditPayload = PlanAddPayload;
export type PlanSelect = Pick<Plan, "id">;

import z from "lib/zod";
import { SubscriptionOrderAction } from "../api/type";

export const subscriptionOrderDefaultForm: SubscriptionOrderAction = {
  planId: "",
  organizationId: "",
};

export const subscriptionOrderSchema: z.ZodType<SubscriptionOrderAction> =
  z.object({
    planId: z.string(),
    organizationId: z.string(),
  });

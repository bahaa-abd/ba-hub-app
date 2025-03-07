import z from "lib/zod";
import { SubscriptionAction } from "../api/type";

export const subscriptionDefaultForm: SubscriptionAction = {
  planId: "",
  organizationId: "",
};

export const subscriptionSchema: z.ZodType<SubscriptionAction> = z.object({
  planId: z.string(),
  organizationId: z.string(),
});

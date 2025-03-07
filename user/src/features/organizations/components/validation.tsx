import z from "lib/zod";
import { OrganizationAction } from "../api/type";

export const organizationDefaultForm: OrganizationAction = {
  name: "",
  sessionHourlyRate: 0,
};

export const organizationSchema: z.ZodType<OrganizationAction> = z.object({
  name: z.string().nonempty(),
  sessionHourlyRate: z.number(),
});

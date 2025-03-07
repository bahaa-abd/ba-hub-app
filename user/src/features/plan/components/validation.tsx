import z from "lib/zod";
import { PlanAction } from "../api/type";
import { PlanDuration } from "constants/enums";
import { localString } from "utils/validation";

export const planDefaultForm: PlanAction = {
  duration: PlanDuration.free,
  price: 0,
  title: {
    ar: "",
    en: "",
  },
  description: {
    ar: "",
    en: "",
  },
};

export const planSchema: z.ZodType<PlanAction> = z.object({
  duration: z.nativeEnum(PlanDuration),
  price: z.number(),
  title: localString,
  description: localString,
});

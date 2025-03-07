import z from "lib/zod";
import { SessionDessertAction } from "./type";
import { localString } from "utils/validation";

export const dessertFormDefault: SessionDessertAction = {
  count: 1,
  dessert: null,
};

const dessertSchema: z.ZodType<SessionDessertAction> = z.object({
  count: z.number(),
  dessert: z.object({
    id: z.string(),
    name: localString,
  }),
});

export default dessertSchema;

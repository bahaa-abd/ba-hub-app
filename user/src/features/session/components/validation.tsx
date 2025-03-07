import z from "lib/zod";
import { SessionAction } from "../api/type";

export const sessionDefaultForm: SessionAction = {
  username: "",
  numberOfPersons: 1,
};

export const sessionSchema: z.ZodType<SessionAction> = z.object({
  username: z.string().nonempty(),
  numberOfPersons: z.number(),
});

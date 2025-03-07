import z from "lib/zod";
import { DessertAction } from "../api/type";
import { DessertType } from "constants/enums";
import { localString } from "utils/validation";

export const dessertDefaultForm: DessertAction = {
  name: {
    ar: "",
    en: "",
  },
  type: DessertType.drink,
  price: 0,
};

export const dessertSchema: z.ZodType<DessertAction> = z.object({
  name: localString,
  type: z.nativeEnum(DessertType),
  price: z.number(),
});

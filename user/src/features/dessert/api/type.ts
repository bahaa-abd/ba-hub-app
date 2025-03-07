import { DessertType } from "constants/enums";
import { APIListParams, LocalString, Payload } from "types/api";

export type DessertAction = {
  name: LocalString;
  price: number;
  type: DessertType;
};

export type Dessert = {
  id: string;
  name: LocalString;
  price: number;
  type: DessertType;
  createdAt: string;
  updatedAt: string;
};

export type DessertAllParams = APIListParams;
export type DessertAddPayload = Payload<undefined, DessertAction>;
export type DessertEditPayload = DessertAddPayload;
export type DessertSelect = Pick<Dessert, "id" | "name">;

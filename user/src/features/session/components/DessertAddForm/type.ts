import { LocalString, Payload } from "types/api";

export type SessionDessertAction = {
  dessert: {
    id: string;
    name: LocalString;
  } | null;
  count: number;
};

export type SessionDessertBody = {
  dessertId: string;
  count: number;
};

export type SessionDessertAddPayload = Payload<undefined, SessionDessertBody>;

import { SessionDessertAction, SessionDessertBody } from "./type";

export function fromFormToBody(form: SessionDessertAction): SessionDessertBody {
  return {
    count: form.count,
    dessertId: form.dessert?.id ?? "",
  };
}

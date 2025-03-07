export type ResponseError =
  | {
      type: "default";
      message: string;
    }
  | {
      type: "form";
      errors: { message: string; path: string[] }[];
      message: string;
    };

export type Payload<Params, Body = undefined> = (Params extends undefined
  ? {}
  : {
      params: Params;
    }) &
  (Body extends undefined ? {} : { body: Body });

export type WithId<T> = {
  id: string;
} & T;
export interface APIList<T> {
  total: number;
  results: T[];
}

export type APIListParams = Partial<{
  page: number;
  pageSize: number;
  sort: string;
  fields: string;
  search: string;
}>;

export type LocalString = {
  ar?: string;
  en?: string;
};

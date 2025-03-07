import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { accountKeys } from "features/account";
import { organizationKeys } from "features/organizations";
import { userKeys } from "features/user";
import { sessionKeys } from "features/session";
import { dessertKeys } from "features/dessert";
import { subscriptionOrderKeys } from "features/subscription-order";
import { planKeys } from "features/plan";

export const queryStore = mergeQueryKeys(
  sessionKeys,
  organizationKeys,
  accountKeys,
  userKeys,
  dessertKeys,
  subscriptionOrderKeys,
  planKeys
);

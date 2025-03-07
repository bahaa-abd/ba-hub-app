import auth from "./auth.json";
import zod from "zod-i18n-map/locales/en/zod.json";
import common from "./common.json";
import layout from "./layout.json";
import validation from "./validation.json";
import admin from "./admin.json";
import category from "./category.json";
import city from "./city.json";
import employee from "./employee.json";
import home from "./home.json";
import user from "./user.json";
import organization from "./organization.json";
import session from "./session.json";
import dessert from "./dessert.json";
import subscription from "./subscription.json";
import subscriptionOrder from "./subscription-order.json";
import warehouse from "./warehouse.json";
import plan from "./plan.json";
import account from "./account.json";

const language = {
  common,
  validation,
  zod,
  layout,
  auth,
  admin,
  category,
  city,
  employee,
  home,
  user,
  warehouse,
  organization,
  session,
  dessert,
  subscription,
  plan,
  account,
  "subscription-order": subscriptionOrder,
} as const;
export default language;

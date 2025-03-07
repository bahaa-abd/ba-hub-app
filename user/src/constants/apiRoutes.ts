let API_ROUTES = {
  ADMINS: {
    root: "admins",
    LOGIN: "login",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
  },
  PLANS: {
    root: "plans",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
  },
  SUBSCRIPTION_ORDERS: {
    root: "subscription-orders",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
    APPROVE: (id: string) => `${id}/approve`,
    REFUSE: (id: string) => `${id}/refuse`,
    GET_MINE: "mine",
  },
  SUBSCRIPTIONS: {
    root: "subscriptions",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
    GET_MINE: "mine",
  },
  SESSIONS: {
    root: "sessions",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
    END: (id: string) => `${id}/end`,
    ADD_DESSERT: (id: string) => `${id}/desserts`,
  },
  DESSERTS: {
    root: "desserts",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
  },
  ORGANIZATIONS: {
    root: "organizations",
    ADD: "",
    GET_ALL: "",
    STATISTICS: "statistics",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
    APPROVE: (id: string) => `${id}/approve`,
    REFUSE: (id: string) => `${id}/refuse`,
  },
  USERS: {
    root: "users",
    GET_ALL: "",
    GET: (id: string) => id,
    DELETE: (id: string) => id,
    SIGNUP: "register",
    LOGIN: "login",
    FORGOT_PASSWORD: "forgotPassword",
    RESET_PASSWORD: "resetPassword",
    UPDATE_MY_PASSWORD: "updateMyPassword",
    ME: "me",
  },
  CITIES: {
    root: "cities",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
  },
  STORES: {
    root: "stores",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
  },
  EMPLOYEES: {
    root: "employees",
    ADD: "",
    GET_ALL: "",
    GET: (id: string) => id,
    EDIT: (id: string) => id,
    DELETE: (id: string) => id,
  },
  STATICS: {
    root: "statistics",
    GET: "",
  },
  WALLET: {
    root: "wallets",
    CHARGE: "chargeMyWallet",
  },
} as const;

const controllersArr = Object.entries(API_ROUTES).map(
  ([controllerKey, { root, ...routes }]) => {
    const routesArr = Object.entries(routes);
    const routesPrefixed = Object.fromEntries(
      routesArr.map(([routeKey, route]) => {
        if (typeof route === "function") {
          return [
            routeKey,
            (...params: Parameters<typeof route>) =>
              `${root}/${(route as (...args: unknown[]) => unknown)(
                ...params
              )}`,
          ];
        }
        return [routeKey, `${root}/${route}`];
      })
    );
    return [controllerKey, { ...routesPrefixed, root }];
  }
);
API_ROUTES = Object.fromEntries(controllersArr) as typeof API_ROUTES;

export default API_ROUTES;

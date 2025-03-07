import { Stack } from "@mui/material";
import AddFab from "components/buttons/AddFab";
import RouterLink from "components/links/RouterLink";
import { SubscriptionOrdersTable } from "features/subscription-order";
import { FC } from "react";

export const SubscriptionOrdersPage: FC<{}> = ({}) => {
  return (
    <Stack gap={1}>
      <RouterLink to="/offers">
        <AddFab />
      </RouterLink>
      <SubscriptionOrdersTable />
    </Stack>
  );
};

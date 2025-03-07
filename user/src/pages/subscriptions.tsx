import { Stack } from "@mui/material";
import { SubscriptionsTable } from "features/subscription";
import { FC } from "react";
export const SubscriptionsPage: FC<{}> = ({}) => {
  return (
    <Stack gap={1}>
      <SubscriptionsTable />
    </Stack>
  );
};

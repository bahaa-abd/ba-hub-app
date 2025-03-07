import { Grid, Stack } from "@mui/material";
import SearchFilter from "components/inputs/SearchFilter";
import FilterRow from "components/layout/FilterRow";
import { OrganizationTable } from "features/organizations";
import { FC } from "react";
export const OrganizationsPage: FC<{}> = ({}) => {
  return (
    <Stack gap={1}>
      <FilterRow>
        <Grid item xs={8} sm={6} md={4} lg={3}>
          <SearchFilter />
        </Grid>
      </FilterRow>
      <OrganizationTable />
    </Stack>
  );
};

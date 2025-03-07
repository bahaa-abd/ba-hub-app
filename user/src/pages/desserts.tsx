import { Grid, Stack } from "@mui/material";
import AddFab from "components/buttons/AddFab";
import SearchFilter from "components/inputs/SearchFilter";
import FilterRow from "components/layout/FilterRow";
import {
  DessertsTable,
  DessertAddForm,
  DessertEditForm,
} from "features/dessert";
import { FC } from "react";
export const DessertsPage: FC<{}> = ({}) => {
  return (
    <Stack gap={1}>
      <FilterRow>
        <Grid item xs={8} sm={6} md={4} lg={3}>
          <SearchFilter />
        </Grid>
      </FilterRow>
      <DessertsTable />
      <AddFab />
      <DessertEditForm />
      <DessertAddForm />
      {/* <DessertRemoveForm /> */}
    </Stack>
  );
};

import { Stack } from "@mui/material";
import {
  OrganizationCardTable,
  OrganizationEditForm,
  OrganizationAddForm,
} from "features/organizations";

export default function MyOrganizationsPage() {
  return (
    <Stack gap={1}>
      <OrganizationCardTable />
      <OrganizationAddForm />
      <OrganizationEditForm />
    </Stack>
  );
}

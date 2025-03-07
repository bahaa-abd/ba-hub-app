import { Button, Stack } from "@mui/material";
import AddFab from "components/buttons/AddFab";
import { Role } from "constants/enums";
import {
  PlanAddForm,
  PlanCardTable,
  PlanEditForm,
  PlanRemoveForm,
  PlanTable,
} from "features/plan";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { storage } from "utils/storage";

export default function PlansPage() {
  const { t: tCommon } = useTranslation();
  const navigate = useNavigate();
  const role = storage.getRole();
  return (
    <>
      {role === Role.user ? (
        <Stack
          gap={2}
          position="relative"
          direction={"column"}
          alignItems="center"
          justifyContent="center"
          sx={{
            textAlign: "center", // Ensure text is centered
          }}
        >
          <PlanCardTable />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/my-organizations")}
            sx={{
              alignSelf: "center", // Center the button horizontally
            }}
          >
            {tCommon("Back to My Organizations")}
          </Button>
        </Stack>
      ) : (
        <Stack gap={1}>
          <AddFab />
          <PlanTable />
          <PlanEditForm />
          <PlanAddForm />
          <PlanRemoveForm />
        </Stack>
      )}
    </>
  );
}

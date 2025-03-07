import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, Fade } from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import Submit from "components/buttons/Submit";
import { useSnackbar } from "context/snackbarContext";
import { queryStore } from "features/shared";
import z from "lib/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import dessertSchema, { dessertFormDefault } from "./validation";
import { sessionQueries } from "features/session";
import { Session } from "features/session";
import { SessionDessertAction } from "./type";
import { DessertAutocomplete } from "features/dessert";
import TextField from "components/inputs/TextField";
import DialogTitle from "components/forms/DialogTitle";
import { fromFormToBody } from "./helpers";
export type DessertAddFormProps = {
  data: Session;
  isAddDessertActive: boolean;
  setActiveDessertSession: Dispatch<SetStateAction<string | null>>;
};
export const DessertAddForm: FC<DessertAddFormProps> = ({
  data,
  isAddDessertActive,
  setActiveDessertSession,
}) => {
  const { control, handleSubmit, reset, setError } = useForm<
    z.infer<typeof dessertSchema>
  >({
    resolver: zodResolver(dessertSchema),
    defaultValues: dessertFormDefault,
  });
  const queryClient = useQueryClient();
  const session = sessionQueries.useAddDessert();
  const snackbar = useSnackbar();
  const { t } = useTranslation("session", { keyPrefix: "form" });
  const handleClose = () => {
    if (isAddDessertActive) {
      setActiveDessertSession(null);
      reset(dessertFormDefault);
    }
  };
  const onSubmit = async (form: SessionDessertAction) => {
    session.mutate(
      { id: data.id, ...fromFormToBody(form) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryStore.session.all._def);

          handleClose();
        },
        onError: parseResponseError({ setError, snackbar }),
      }
    );
  };

  return (
    <Dialog
      open={isAddDessertActive}
      onClose={handleClose}
      fullWidth
      maxWidth={"xs"}
    >
      <Fade in={isAddDessertActive} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          <Stack gap={1}>{t("formAddDessert")}</Stack>
        </DialogTitle>
      </Fade>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <Stack
              gap={2}
              sx={{
                width: "80%",
                mt: 5,
                mx: "auto",
              }}
            >
              <DessertAutocomplete
                control={control}
                name="dessert"
                label={t("dessert")}
              />
              <TextField
                name="count"
                control={control}
                label={t("count")}
                type="number"
              />
              <Submit
                sx={{ px: 5, width: "fit-content", mx: "auto" }}
                isSubmitting={session.isLoading}
              >
                {t("create")}
              </Submit>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

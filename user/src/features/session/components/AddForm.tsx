import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, Fade, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Submit from "components/buttons/Submit";
import DialogTitle from "components/forms/DialogTitle";
import TextField from "components/inputs/TextField";
import { useSnackbar } from "context/snackbarContext";
import { queryStore } from "features/shared";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { sessionDefaultForm, sessionSchema } from "./validation";
import { SessionAction } from "../api/type";
import { sessionQueries } from "..";
import useAddSearchParams from "hooks/useAddSearchParams";

export type AddFormProps = {};
export const AddForm: FC<AddFormProps> = ({}) => {
  const { isActive, clearAddParams } = useAddSearchParams();

  const { t } = useTranslation("session");
  const { control, reset, handleSubmit, setError } = useForm<SessionAction>({
    resolver: zodResolver(sessionSchema),
    defaultValues: sessionDefaultForm,
  });
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();

  const add = sessionQueries.useAdd();
  const handleClose = () => {
    reset(sessionDefaultForm);
    clearAddParams();
  };
  const onSubmit = async (body: SessionAction) => {
    add.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.session.all._def);
        handleClose();
        successSnackbar(t("message.success.add"));
      },
      onError: parseResponseError({ snackbar, setError }),
    });
  };

  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"sm"}>
      <Fade in={isActive} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t("add")}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} my={1}>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="username"
                label={t(`form.username`)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="numberOfPersons"
                label={t(`form.numberOfPersons`)}
                required
                type="number"
              />
            </Grid>
            <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
              <Submit isSubmitting={add.isLoading} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

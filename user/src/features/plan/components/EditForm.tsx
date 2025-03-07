import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, Fade, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Submit from "components/buttons/Submit";
import DialogTitle from "components/forms/DialogTitle";
import TextField from "components/inputs/TextField";
import { useSnackbar } from "context/snackbarContext";
import { PlanAction, planQueries } from "features/plan";
import { queryStore } from "features/shared";
import useEditSearchParams from "hooks/useEditSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { planDefaultForm, planSchema } from "./validation";
import { Select } from "components/selects/Select";
import { PlanDuration } from "constants/enums";
export type EditFormProps = {};
export const EditForm: FC<EditFormProps> = ({}) => {
  const { isActive, clearEditParams, id = "" } = useEditSearchParams();
  const { t } = useTranslation("plan");
  const query = planQueries.useDetails(id);
  const { control, reset, handleSubmit, setError } = useForm<PlanAction>({
    resolver: zodResolver(planSchema),

    defaultValues: query.data ?? planDefaultForm,
  });
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();
  const mutation = planQueries.useEdit();
  const handleClose = () => {
    clearEditParams();
    reset(planDefaultForm);
  };
  const onSubmit = async (body: PlanAction) => {
    mutation.mutate(
      { id, ...body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryStore.plan.all._def);
          queryClient.invalidateQueries(queryStore.plan.details(id));
          handleClose();
          successSnackbar(t("message.success.edit"));
        },
        onError: parseResponseError({ snackbar, setError }),
      }
    );
  };
  useEffect(() => {
    if (query.data) reset(query.data);
  }, [query.data, reset]);

  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <Fade in={isActive} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          {t("add")}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1} my={1}>
            {/* Arabic Title */}
            <Grid item xs={12}>
              <TextField
                control={control}
                name="title.ar"
                label={t(`form.title_ar`)}
                required
              />
            </Grid>
            {/* English Title */}
            <Grid item xs={12}>
              <TextField
                control={control}
                name="title.en"
                label={t(`form.title_en`)}
                required
              />
            </Grid>
            {/* Arabic Description */}
            <Grid item xs={12}>
              <TextField
                control={control}
                name="description.ar"
                label={t(`form.description_ar`)}
                required
                multiline
              />
            </Grid>
            {/* English Description */}
            <Grid item xs={12}>
              <TextField
                control={control}
                name="description.en"
                label={t(`form.description_en`)}
                required
                multiline
              />
            </Grid>
            {/* Duration */}
            <Grid item xs={12}>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onClear={() => field.onChange("")}
                    options={PlanDuration}
                    label={t(`form.duration`)}
                    required
                  />
                )}
              />
            </Grid>
            {/* Price */}
            <Grid item xs={12}>
              <TextField
                control={control}
                name="price"
                label={t(`form.price`)}
                required
                type="number"
              />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
              <Submit isSubmitting={mutation.isLoading} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

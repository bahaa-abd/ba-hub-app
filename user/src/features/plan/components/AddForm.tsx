import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, Fade, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Submit from "components/buttons/Submit";
import DialogTitle from "components/forms/DialogTitle";
import TextField from "components/inputs/TextField";
import { useSnackbar } from "context/snackbarContext";
import { PlanAction, planQueries } from "features/plan";
import { queryStore } from "features/shared";
import useAddSearchParams from "hooks/useAddSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { planDefaultForm, planSchema } from "./validation";
import { PlanDuration } from "constants/enums";
import { Select } from "components/selects/Select";

export type AddFormProps = {};

export const AddForm: FC<AddFormProps> = ({}) => {
  const { isActive, clearAddParams } = useAddSearchParams();
  const { t } = useTranslation("plan");
  const { control, reset, handleSubmit, setError } = useForm<PlanAction>({
    resolver: zodResolver(planSchema),
    defaultValues: planDefaultForm,
  });

  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();
  const add = planQueries.useAdd();

  const handleClose = () => {
    clearAddParams();
    reset(planDefaultForm);
  };

  const onSubmit = async (body: PlanAction) => {
    add.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.plan.all._def);
        handleClose();
        successSnackbar(t("message.success.add"));
      },
      onError: parseResponseError({ snackbar, setError }),
    });
  };

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
              <Submit isSubmitting={add.isLoading} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

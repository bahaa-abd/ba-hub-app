import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, Fade, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Submit from "components/buttons/Submit";
import DialogTitle from "components/forms/DialogTitle";
import TextField from "components/inputs/TextField";
import { useSnackbar } from "context/snackbarContext";
import { DessertAction, dessertQueries } from "features/dessert";
import { queryStore } from "features/shared";
import useAddSearchParams from "hooks/useAddSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { dessertDefaultForm, dessertSchema } from "./validation";
import { DessertType, DessertTypeAr } from "constants/enums";
import { Select } from "components/selects/Select";
import i18n from "lib/i18next";

export type AddFormProps = {};
export const AddForm: FC<AddFormProps> = ({}) => {
  const { isActive, clearAddParams } = useAddSearchParams();
  const { t } = useTranslation("dessert");
  const { control, reset, handleSubmit, setError } = useForm<DessertAction>({
    resolver: zodResolver(dessertSchema),
    defaultValues: dessertDefaultForm,
  });
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();

  const add = dessertQueries.useAdd();
  const handleClose = () => {
    clearAddParams();
    reset(dessertDefaultForm);
  };
  const onSubmit = async (body: DessertAction) => {
    add.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.dessert.all._def);
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
            <Grid item xs={12}>
              <TextField
                control={control}
                name="name.ar"
                label={t(`form.name_ar`)}
                required
              />
            </Grid>
            {/* English Title */}
            <Grid item xs={12}>
              <TextField
                control={control}
                name="name.en"
                label={t(`form.name_en`)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onClear={() => field.onChange("")}
                    options={
                      (i18n.language === "en"
                        ? DessertType
                        : DessertTypeAr) as unknown as Record<string, string>
                    }
                    label={t(`form.type`)}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="price"
                label={t(`form.price`)}
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

import { Box, Grid, Tooltip, useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "context/snackbarContext";
import { queryStore } from "features/shared";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { sessionQueries } from "..";
import { SessionAction } from "../api/type";
import Submit from "components/buttons/Submit";
import { SessionStatus } from "constants/enums";
import { purple } from "@mui/material/colors";
import { StopCircle } from "@mui/icons-material";

export type EndFormProps = {
  id: string;
  status: string;
};

export const EndForm: FC<EndFormProps> = ({ id, status }) => {
  const theme = useTheme();

  const { t } = useTranslation("session");
  const { handleSubmit, setError } = useForm<SessionAction>({});
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();
  const mutation = sessionQueries.useEnd();

  const onSubmit = async () => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.session.all._def);
        successSnackbar(t("message.success.end"));
      },
      onError: parseResponseError({ snackbar, setError }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid>
          <Tooltip title={t("endSession")}>
            <span>
              <Submit
                variant="contained"
                sx={{
                  width: "100px",
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "20px",
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": { backgroundColor: purple[800] },
                  color: "white",
                }}
                isSubmitting={mutation.isLoading}
                disabled={status === SessionStatus.ended}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    color: "inherit",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StopCircle sx={{ fontSize: 20, color: "white" }} />
                  {t("form.end")}
                </Box>
              </Submit>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};

import { Box, Grid, Tooltip } from "@mui/material";
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
import { red } from "@mui/material/colors";
import { Cancel } from "@mui/icons-material";

export type CancelFormProps = {
  id: string;
  status: string;
};

export const CancelForm: FC<CancelFormProps> = ({ id, status }) => {
  const { t } = useTranslation("session");
  const { handleSubmit, setError } = useForm<SessionAction>({});
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();
  const mutation = sessionQueries.useCancel();

  const onSubmit = async () => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.session.all._def);
        successSnackbar(t("message.success.cancel"));
      },
      onError: parseResponseError({ snackbar, setError }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid>
          <Tooltip title={t("cancelSession")}>
            <span>
              <Submit
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "20px",
                  backgroundColor: red[500],
                  "&:hover": { backgroundColor: red[800] },
                  color: "white",
                  minWidth: "50px",
                }}
                isSubmitting={mutation.isLoading}
                disabled={
                  status === SessionStatus.ended ||
                  status === SessionStatus.cancelled
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    color: "inherit",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Cancel sx={{ fontSize: 20, color: "white" }} />
                </Box>
              </Submit>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};

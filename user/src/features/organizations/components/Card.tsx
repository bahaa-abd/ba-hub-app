import {
  CardContent,
  Avatar,
  Typography,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { green, red, pink } from "@mui/material/colors";
import EditIconButton from "components/buttons/EditIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import { FC } from "react";
import { storage } from "utils/storage";
import { diffInDays } from "utils/transforms";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // Subscription icon
import useEventSearchParams from "hooks/useEventSearchParams";
import { useQueryClient } from "@tanstack/react-query";
import { queryStore } from "features/shared";
import RouterLink from "components/links/RouterLink";
import { useTranslation } from "react-i18next";

export const OrganizationCard: FC<{ item: any }> = ({ item }) => {
  const { edit } = useEventSearchParams();
  const queryClient = useQueryClient();

  const subscriptionExpired =
    !item.expiresDate || diffInDays(item.expiresDate) <= 0;

  const handelLinks = () => {
    storage.setOrg(item.id);
    queryClient.setQueryData(
      queryStore.organization.details(item.id).queryKey,
      item
    );
  };
  const { t: tCommon } = useTranslation();

  return (
    <CardContent>
      <RouterLink
        to={`${item.id}/sessions`}
        style={{
          textDecoration: "none",
          display: "inline-block",
          width: "100%",
        }}
        onClick={handelLinks}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            fontSize: "30px",
            mb: 2,
          }}
        >
          {item.icon}
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          {item.name}
        </Typography>
      </RouterLink>

      {/* Status & Expiry */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <Tooltip title={`Status: ${item.status}`}>
          {item.status === "active" && !subscriptionExpired ? (
            <CheckCircleIcon sx={{ color: green[500], fontSize: 21 }} />
          ) : (
            <CancelIcon sx={{ color: red[500], fontSize: 21 }} />
          )}
        </Tooltip>
        <Typography variant="body2" color="text.secondary" fontSize={16}>
          {subscriptionExpired
            ? tCommon("Subscription Expired")
            : `${tCommon("Expires in")} ${diffInDays(
                item.expiresDate
              )} ${tCommon("day(s)")}`}
        </Typography>
      </Stack>

      {/* Hourly Rate */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
        <AccessTimeIcon sx={{ color: pink[500], fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">
          {item.sessionHourlyRate} {tCommon("SYP/hour")}
        </Typography>
      </Stack>

      {/* Buttons */}
      <ButtonsStack>
        <EditIconButton onClick={() => edit(item.id)} />
        {subscriptionExpired && (
          <Tooltip title="Subscribe to a plan">
            <RouterLink to="/offers">
              <IconButton onClick={handelLinks}>
                <NotificationsActiveIcon sx={{ color: "#1834e9" }} />
              </IconButton>
            </RouterLink>
          </Tooltip>
        )}
      </ButtonsStack>
    </CardContent>
  );
};

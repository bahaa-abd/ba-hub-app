import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fab, FabProps, Tooltip } from "@mui/material";
import OptionalWrap from "components/layout/OptionalWrap";
import { HideOnScroll } from "features/layout";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = FabProps & { hideOnScroll?: boolean };

const BackFab: FC<Props> = ({ hideOnScroll = false, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Navigate back to the previous route
  };

  return (
    <Tooltip title={t("back")}>
      <span>
        <OptionalWrap
          Element={HideOnScroll}
          wrap={hideOnScroll}
          ElementProps={{}}
        >
          <Fab
            color="secondary"
            onClick={handleClick}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            {...props}
          >
            <ArrowBackIcon sx={{ color: "white" }} />
          </Fab>
        </OptionalWrap>
      </span>
    </Tooltip>
  );
};

export default BackFab;

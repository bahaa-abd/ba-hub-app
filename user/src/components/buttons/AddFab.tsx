import AddIcon from "@mui/icons-material/Add";
import { Fab, FabProps, Tooltip } from "@mui/material";
import OptionalWrap from "components/layout/OptionalWrap";
import { HideOnScroll } from "features/layout";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
type Props = FabProps & { hideOnScroll?: boolean };
const AddFab: FC<Props> = ({ hideOnScroll = false, ...props }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    searchParams.set("mode", "add");
    setSearchParams(searchParams);
  };
  return (
    <Tooltip title={t("add")}>
      <span>
        <OptionalWrap
          Element={HideOnScroll}
          wrap={hideOnScroll}
          ElementProps={{}}
        >
          <Fab
            color="primary"
            onClick={handleClick}
            sx={{ position: "fixed", bottom: 16, right: 80 }}
            {...props}
          >
            <AddIcon sx={{ color: "white" }} />
          </Fab>
        </OptionalWrap>
      </span>
    </Tooltip>
  );
};
export default AddFab;

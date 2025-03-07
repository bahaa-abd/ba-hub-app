import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import globalLanguageContext from "context/languageContext";
import { availableLanguages } from "lib/i18next";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { drawerWidth } from "./Layout";
import { useIsDesktop } from "hooks/useIsDesktop";
import RouterLink from "components/links/RouterLink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
type Props = {
  hideSidebar: boolean;
  open: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
};
export const AppBar: FC<Props> = ({
  hideSidebar,
  open,
  onDrawerOpen,
  onDrawerClose,
}) => {
  const { t } = useTranslation("layout");
  let pageTitle =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  pageTitle = pageTitle ? pageTitle : "organizations";
  const { lang, setLang } = useContext(globalLanguageContext);
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setLang(e.target.value);
  };
  const isDesktop = useIsDesktop();

  return (
    <AppBarStyled position="fixed" open={open} key={pageTitle}>
      <Toolbar>
        {!hideSidebar && (
          <IconButton
            color="inherit"
            onClick={open ? onDrawerClose : onDrawerOpen}
            edge="start"
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" pl={0.5}>
          {t(`navLink.${pageTitle}`)}
        </Typography>
        <Select
          value={lang}
          onChange={handleChangeLanguage}
          size="small"
          sx={{
            color: "white",
            svg: { color: "white" },
            height: "fit-content",
            ml: "auto",
          }}
        >
          {availableLanguages.map((language) => (
            <MenuItem value={language} key={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        {/* {!isDesktop && ( */}
        <Stack alignItems={"end"} justifyContent={"center"}>
          <RouterLink to="/settings">
            <IconButton sx={{ svg: { height: 30, width: 30 } }}>
              <AccountCircleIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          </RouterLink>
        </Stack>
        {/* )} */}
      </Toolbar>
    </AppBarStyled>
  );
};
export default AppBar;

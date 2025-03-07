import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { FC, Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TopBarProgressIndicator } from "../../../Wrapper/TopBarProgressProvider";
import AppBar from "./AppBar";
import Main from "./Main";
import Sidebar from "./SideBar";
import BackFab from "components/buttons/BackFab";
export const drawerWidth = 240;

const Layout: FC = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation(); // Get current route

  const [open, setOpen] = useState<boolean>(isLargeScreen);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Hide sidebar when exactly at "/my-organizations"
  const hideSidebar =
    location.pathname === "/my-organizations" ||
    location.pathname === "/offers";

  return (
    <Box>
      <BackFab hideOnScroll />
      <AppBar
        open={open}
        onDrawerOpen={handleDrawerOpen}
        onDrawerClose={handleDrawerClose}
        hideSidebar={hideSidebar}
      />
      {!hideSidebar && <Sidebar open={open} setOpen={setOpen} />}
      <Toolbar />
      <Main open={!hideSidebar && open} sx={{ px: { xs: 1, sm: 5 }, py: 3 }}>
        <Suspense fallback={<TopBarProgressIndicator />}>
          <Outlet />
        </Suspense>
      </Main>
    </Box>
  );
};

export default Layout;

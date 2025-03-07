import DessertsIcon from "@mui/icons-material/LocalDrink";
import SessionsIcon from "@mui/icons-material/Apps";
import Apps from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/ViewAgenda";
import { ReactNode } from "react";
import { storage } from "utils/storage";
import { Role } from "./enums";

export type SideBarItem = {
  href: string;
  icon: ReactNode;
  children?: SideBarItem[];
  withId: boolean;
};

export const createSideBarItems: () => SideBarItem[] = () => {
  const role = storage.getRole();
  const items: SideBarItem[] = [
    // Admin specific items
    ...(role === Role.admin
      ? [
          {
            href: "organizations",
            icon: <Apps />,
            withId: false,
          },
          {
            href: "subscriptions",
            icon: <Apps />,
            withId: false,
          },
          {
            href: "subscription-orders",
            icon: <Apps />,
            withId: false,
          },
          {
            href: "plans",
            icon: <Apps />,
            withId: false,
          },
        ]
      : []),

    // Common items for all roles

    // User specific items
    ...(role === Role.user
      ? [
          {
            href: "my-organizations",
            icon: <Apps />,
            withId: false,
          },
          {
            href: "subscriptions",
            icon: <Apps />,
            withId: true,
          },
          {
            href: "subscription-orders",
            icon: <Apps />,
            withId: true,
          },
          {
            href: "sessions",
            icon: <SessionsIcon />,
            withId: true,
          },
          {
            href: "desserts",
            icon: <DessertsIcon />,
            withId: true,
          },
          {
            href: "statistics",
            icon: <PublicIcon />,
            withId: true,
          },
        ]
      : []),
  ];

  return items;
};

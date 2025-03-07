import PermIdentityIcon from "@mui/icons-material/PermIdentity";
export const settingsTabs = [
  {
    href: "account",
    Icon: PermIdentityIcon,
  },
] as const;

export const accountLists: {
  title: string;
  items: { href: string; name: string; color?: string }[];
}[] = [
  {
    title: "profile",
    items: [
      { href: "/settings/profile", name: "profile" },
      { href: "/settings/profile/edit", name: "profile-edit" },
    ],
  },
  {
    title: "security",
    items: [
      { href: "/settings/password-change", name: "password-change" },
      { href: "/settings/password-forgot", name: "password-forgot" },
    ],
  },
  {
    title: "account",
    items: [
      { href: "/settings/logout", name: "profile-logout", color: "error.main" },
    ],
  },
];

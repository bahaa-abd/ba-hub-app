import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { forwardRef, Ref } from "react";
import { Link, LinkProps as RouterLinkProps } from "react-router-dom";

// Rename RouterLinkProps to avoid conflict with MUI LinkProps
export type CustomRouterLinkProps = MuiLinkProps &
  RouterLinkProps & { noStyle?: boolean };

const RouterLink = forwardRef<HTMLAnchorElement, CustomRouterLinkProps>(
  function FR(
    { children, noStyle = false, ...props }: CustomRouterLinkProps,
    ref: Ref<HTMLAnchorElement> // Use Ref instead of LegacyRef
  ) {
    return (
      <MuiLink
        ref={ref} // Forward ref properly
        component={Link} // Specify the RouterLink component from react-router-dom
        {...props}
        sx={{
          ...(noStyle && {
            textDecoration: "none",
            color: "inherit",
            "&:hover": { color: "inherit" },
          }),
          ...props.sx,
        }}
      >
        {children}
      </MuiLink>
    );
  }
);

export default RouterLink;

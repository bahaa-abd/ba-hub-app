import { LinkProps } from "@mui/material";
import { FC } from "react";
import RouterLink from "./RouterLink";
import { To } from "react-router-dom";

type Props = LinkProps & { withLink: boolean; to: To };

const OptionalLink: FC<Props> = ({
  withLink,
  children,
  to,
  color,
  ...props
}) => {
  // Ensure color is not an array (convert if necessary)
  const validColor = Array.isArray(color) ? color[0] : color;

  return withLink ? (
    <RouterLink to={to} color={validColor} {...props}>
      {children}
    </RouterLink>
  ) : (
    <>{children}</>
  );
};

export default OptionalLink;

import CloseIcon from "@mui/icons-material/Close";
import {
  DialogTitleProps,
  IconButton,
  DialogTitle as MuiDialogTitle,
} from "@mui/material";
import Skeleton from "components/feedback/Skeleton";
import { forwardRef, Ref } from "react";

// Define the props for DialogTitle
type Props = { onClose?: () => void; skeleton?: boolean } & DialogTitleProps;

// Use forwardRef with an explicit type for ref
const DialogTitle = forwardRef<HTMLSpanElement, Props>(function DialogTitle(
  { skeleton, children, onClose, ...props }: Props,
  ref: Ref<HTMLSpanElement>
) {
  return (
    <MuiDialogTitle {...props} sx={{ m: 0, p: 2, ...props.sx }} ref={ref}>
      {skeleton ? <Skeleton widthRange={{ min: 100, max: 100 }} /> : children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default DialogTitle;

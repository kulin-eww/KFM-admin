import "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    cancel: true;
    disabledLike: true;
  }
}
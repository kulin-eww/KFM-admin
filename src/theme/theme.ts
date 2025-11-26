import { createTheme } from "@mui/material";

const palette = {
  backgroundDefault: "#FFFF",
  backgroundPaper: "#e9e8eb",
  textPrimary: "#2f2b3de6",
  textSecondary: "#2f2b3d8c",
  buttonText: "#FFFFFF",
  customDark: "#363636",
  primary: "#C3DC78",
};

export const getMuiTheme = () => {
  return createTheme({
    palette: {
      background: {
        default: "#FFFF",
        paper: "#FFFF",
      },
      text: {
        primary: "#1A201F",
        secondary: "#333333",
      },
      primary: {
        main: "#C3DC78",
      },
      secondary: {
        main: "#B933FFCC",
      },
      error: {
        main: "#ea5455",
      },
      warning: {
        main: "#FF8228",
      },
      info: {
        main: "#007bff",
      },
      success: {
        main: "#28c76f",
      },
      grey: {
        900: palette.customDark,
        600: "#888888",
      },
    },
    typography: {
      fontFamily: "changa",
      fontSize: 16,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            legend: {
              width: 0,
            },
          },
          input: {
            paddingTop: "8px",
            paddingBottom: "8px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              borderColor: "#EDF1F3",
              fontSize: "16px",
              "&:hover fieldset": {
                borderColor: "#007A47",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#007A47",
              },
            },
          },
        },
        defaultProps: {
          size: "small",
          slotProps: {
            inputLabel: {
              shrink: true,
              sx: {
                position: "relative",
                transform: "none",
                mb: 1,
                fontWeight: 500,
                fontSize: "14px",
              },
            },
            // input: {
            //   notched: false,
            // },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-error": {
              color: "#6C7278",
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            textAlign: "left",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          loadingIndicator: {
            color: "linear-gradient(180deg, #453C99 0%, #7364FF 100%)",
          },
          root: {
            background: "linear-gradient(180deg, #453C99 0%, #7364FF 100%)",
            color: palette.buttonText,
            borderRadius: "8px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              background: "linear-gradient(180deg, #453C99 0%, #7364FF 70%)",
            },
            "&.Mui-disabled": {
              background: "linear-gradient(180deg, #e0e0e0 0%, #bdbdbd 100%)",
              boxShadow: "none",
            },
          },
        },
        variants: [
          {
            props: { variant: "cancel" },
            style: {
              background: "linear-gradient(0deg, #E9E9E9 0%, #C0C0C0 100%)",
              color: "#000000",
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(0deg, #E9E9E9 0%, #C0C0C0 70%)",
              },
            },
          },
          {
            props: { variant: "contained" },
            style: {
              background: "linear-gradient(180deg, #453C99 0%, #7364FF 100%)",
              color: palette.buttonText,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                background: "linear-gradient(180deg, #453C99 0%, #7364FF 70%)",
              },
              "&.Mui-disabled": {
                background: "linear-gradient(180deg, #e0e0e0 0%, #bdbdbd 100%)",
                boxShadow: "none",
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              backgroundColor: "#ffffff",
              color: "#007a47",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#e8e8e8",
              },
            },
          },
          {
            props: { variant: "disabledLike" },
            style: {
              backgroundColor: "#e0e0e0",
              color: "#9e9e9e",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#d5d5d5",
              },
            },
          },
        ],
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 48,
            height: 26,
            padding: 0,
            display: "flex",
          },
          switchBase: {
            padding: 2,
            "&.Mui-checked": {
              transform: "translateX(22px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#C3DC78",
                opacity: 1,
                border: 0,
              },
            },
          },
          thumb: {
            width: 22,
            height: 22,
            boxShadow: "none",
            backgroundColor: "#fff",
          },
          track: {
            borderRadius: 26 / 2,
            opacity: 1,
            backgroundColor: "#ccc",
            boxSizing: "border-box",
          },
        },
      },
    },
  });
};

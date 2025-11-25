import { ThemeProvider } from "@mui/material";
import { AppRouter } from "./utils/Router";
import { getMuiTheme } from "./theme/theme";
import { useEffect } from "react";
import { onMessageListener, requestNotificationPermission } from "./utils/firebaseConfig";

const App = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }

  useEffect(() => {
    requestNotificationPermission()
      .then((res: string) => {
        console.log("FCM Token: ", res);
        localStorage.setItem("fcmToken", res);
      })
      .catch((error) => {
        console.error("FCM error: ", error);
      });

    onMessageListener()
      .then((payload: any) => {
        console.log("Message listener: ", payload);
      })
      .catch((error) => {
        console.error("Message listener error: ", error);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <AppRouter />
      </ThemeProvider>
    </>
  );
};

export default App;

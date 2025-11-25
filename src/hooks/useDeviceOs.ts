import { useEffect, useState } from "react";

export const useDeviceOS = () => {
  const [os, setOS] = useState("Unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/windows phone/i.test(userAgent)) {
      setOS("windowsPhone");
    } else if (/android/i.test(userAgent)) {
      setOS("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window)) {
      setOS("ios");
    } else if (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) {
      // iPadOS identifies as "Macintosh" with touch support
      setOS("ios");
    } else if (/Win/i.test(userAgent)) {
      setOS("windows");
    } else if (/Mac/i.test(userAgent)) {
      setOS("macos");
    } else {
      setOS("Unknown");
    }
  }, []);

  return os;
};

import { useEffect, useState } from "react";

const calculateRequestTimeLeft = (payload: { created_at: string; timeout_minutes: number }) => {
  const orderDate = new Date(payload?.created_at);
  const now: any = new Date();
  const expiry: any = new Date(orderDate.getTime() + payload?.timeout_minutes * 60 * 1000); // +payload.timeout_minutes minutes
  const remaining = expiry - now;

  if (remaining <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };

  const hours = Math.floor((remaining / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((remaining / 1000 / 60) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return { hours, minutes, seconds, expired: false };
};

const useRequestTimeout = (payload: { created_at: string; timeout_minutes: number }) => {
  const [timeLeft, setTimeLeft] = useState(calculateRequestTimeLeft(payload));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateRequestTimeLeft(payload));
    }, 1000);
    return () => clearInterval(timer);
  }, [payload]);

  return timeLeft;
};

export default useRequestTimeout;

import { useEffect, useState, useRef } from "react";

interface UseCountUpOptions {
  duration?: number;
}

const useCountUp = (
  targetValue: string | number | null | undefined,
  options: UseCountUpOptions = {}
) => {
  const { duration = 2000 } = options;
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const previousValueRef = useRef<string | number | null | undefined>(null);

  useEffect(() => {
    if (targetValue === null || targetValue === undefined) {
      setDisplayValue(0);
      previousValueRef.current = targetValue;
      return;
    }

    // If value hasn't changed, don't re-animate
    if (previousValueRef.current === targetValue) {
      return;
    }

    // Cancel any ongoing animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // If value is a string with commas (like "10,000"), extract the number
    const numericValue = typeof targetValue === "string" 
      ? parseFloat(targetValue.replace(/,/g, "")) 
      : targetValue;

    if (isNaN(numericValue)) {
      setDisplayValue(targetValue);
      previousValueRef.current = targetValue;
      return;
    }

    const startTime = Date.now();
    const startValue = 0;
    const isStringWithCommas = typeof targetValue === "string" && targetValue.includes(",");

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (numericValue - startValue) * easeOutQuart;

      // Format the number if original was a string with commas
      if (isStringWithCommas) {
        setDisplayValue(Math.round(currentValue).toLocaleString());
      } else {
        setDisplayValue(Math.round(currentValue));
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value matches exactly
        setDisplayValue(targetValue);
        previousValueRef.current = targetValue;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [targetValue, duration]);

  return displayValue;
};

export default useCountUp;


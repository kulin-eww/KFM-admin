import React from "react";

interface OptimizedImageProps {
  src: File | string | null;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
  variant?: "circular" | "rectangular";
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width = "160px",
  height = "160px",
  variant = "rectangular",
  onLoad,
  onError,
}) => {
  const getImageSrc = () => {
    if (!src) return "";
    return src instanceof File ? URL.createObjectURL(src) : src;
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.style.opacity = "1";
    onLoad?.();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.style.display = "none";
    onError?.();
  };

  const getBorderRadius = () => {
    return variant === "circular" ? "rounded-full" : "rounded-lg";
  };

  return (
    <>
      <style>
        {`
          @keyframes loading {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
      <img
        src={getImageSrc()}
        alt={alt}
        className={`object-cover ${getBorderRadius()} ${className}`}
        style={{
          width,
          height,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "loading 1.5s infinite",
        }}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
};

export default OptimizedImage;

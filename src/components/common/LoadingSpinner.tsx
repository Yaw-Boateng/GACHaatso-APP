import React from "react";
import { Loader2 } from "lucide-react";

const SIZE_MAP = {
  small: 16,
  medium: 32,
  large: 48,
};

interface LoadingSpinnerProps {
  className?: string;
  size?: number | keyof typeof SIZE_MAP;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = "text-neutral-500",
  size = "medium",
}) => {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`animate-spin ${className}`} size={pixelSize} />
    </div>
  );
};

export default LoadingSpinner;
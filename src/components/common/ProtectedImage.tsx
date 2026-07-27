import React, { useMemo, useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { IMAGE_BASE_URL } from "../../services/apiClient"; // import your IMAGE_BASE_URL helper

interface ProtectedImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt = "",
  className,
}) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const displayUrl = useMemo(() => {
    const cleanSrc = src ? src.trim() : "";
    if (!cleanSrc) return "";

    let normalized = cleanSrc;
    if (normalized.includes("%20") || normalized.includes(" ")) {
      normalized = decodeURIComponent(normalized).trim();
      const lastHttpIndex = normalized.lastIndexOf("http");
      if (lastHttpIndex > 0) {
        normalized = normalized.substring(lastHttpIndex);
      }
    }

    if (normalized.startsWith("https:/") && !normalized.startsWith("https://")) {
      normalized = normalized.replace("https:/", "https://");
    }
    if (normalized.startsWith("http:/") && !normalized.startsWith("http://")) {
      normalized = normalized.replace("http:/", "http://");
    }

    if (!normalized) return "";

    return normalized.startsWith("http://") || normalized.startsWith("https://")
      ? normalized
      : `${IMAGE_BASE_URL}/${normalized.replace(/^\//, "")}`;
  }, [src]);

  if (!displayUrl || error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 rounded-lg`}>
        <ImageIcon size={16} />
      </div>
    );
  }

  return (
    <img
      src={displayUrl}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export default ProtectedImage;
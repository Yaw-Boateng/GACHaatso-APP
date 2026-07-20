import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

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
  const [displayUrl, setDisplayUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let cleanSrc = src ? src.trim() : "";

    // 1. Sanitize incoming source formats
    if (cleanSrc.includes("%20") || cleanSrc.includes(" ")) {
      const decodedSrc = decodeURIComponent(cleanSrc).trim();
      const lastHttpIndex = decodedSrc.lastIndexOf("http");
      if (lastHttpIndex > 0) {
        cleanSrc = decodedSrc.substring(lastHttpIndex);
      }
    }

    if (cleanSrc.startsWith("https:/") && !cleanSrc.startsWith("https://")) {
      cleanSrc = cleanSrc.replace("https:/", "https://");
    }
    if (cleanSrc.startsWith("http:/") && !cleanSrc.startsWith("http://")) {
      cleanSrc = cleanSrc.replace("http:/", "http://");
    }

    if (!cleanSrc) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    // Build the final target URL pointing directly to the static asset folder
    const finalUrl = cleanSrc.startsWith("http://") || cleanSrc.startsWith("https://")
      ? cleanSrc
      : `https://gachaatso-backend.onrender.com/${cleanSrc.replace(/^\//, "")}`;

    setDisplayUrl(finalUrl);
    setLoading(false);
  }, [src]); // Triggers only when source image changes explicitly

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center bg-theme-base/10`}>
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !displayUrl) {
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
      onError={() => {
        // Fallback layout check if the server asset fails to resolve natively
        setError(true);
      }}
    />
  );
};

export default ProtectedImage;
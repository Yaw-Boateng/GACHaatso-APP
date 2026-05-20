import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import api from "./api";

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
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      setLoading(false);
      return;
    }

    let currentBlobUrl = "";
    setLoading(true);
    setError(false);

    // Fetch the raw asset as a binary blob utilizing your authorized Axios client instance
    api
      .get(src, { responseType: "blob" })
      .then((response) => {
        currentBlobUrl = URL.createObjectURL(response.data);
        setBlobUrl(currentBlobUrl);
      })
      .catch((err) => {
        console.error(
          `Failed to securely streaming asset mapping payload for: ${src}`,
          err,
        );
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    // Revoke memory mapping allocation structures when target unmounts
    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-theme-base/10`}
      >
        <div className="w-3 h-3 border border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blobUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-theme-base text-theme-muted`}
      >
        <ImageIcon size={14} />
      </div>
    );
  }

  return <img src={blobUrl} alt={alt} className={className} />;
};

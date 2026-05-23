import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import api from "./api"; // Ensure this matches your path configuration

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
    let cleanSrc = src ? src.trim() : "";

    // UNIVERSAL PATCH: Fixes nested/doubled domains containing an implicit space or encoded '%20'
    if (cleanSrc.includes("%20") || cleanSrc.includes(" ")) {
      // Decode if %20 string blocks exist, then grab the last clean segment starting with HTTP
      const decodedSrc = decodeURIComponent(cleanSrc).trim();
      const lastHttpIndex = decodedSrc.lastIndexOf("http");
      
      if (lastHttpIndex > 0) {
        cleanSrc = decodedSrc.substring(lastHttpIndex);
      }
    }

    // SANITY CHECK: Ensure standard double forward slashes are intact on absolute schemas
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

    let currentBlobUrl = "";
    setLoading(true);
    setError(false);

    const isAbsolute = cleanSrc.startsWith("http://") || cleanSrc.startsWith("https://");
    
    const finalUrl = isAbsolute 
      ? cleanSrc 
      : `${api.defaults.baseURL?.replace("/api/v1", "")}${cleanSrc}`;

    api
      .get(finalUrl, { 
        responseType: "blob",
        baseURL: isAbsolute ? "" : undefined 
      })
      .then((response) => {
        currentBlobUrl = URL.createObjectURL(response.data);
        setBlobUrl(currentBlobUrl);
      })
      .catch((err) => {
        console.error(
          `Failed to securely stream asset mapping payload for: ${finalUrl}`,
          err
        );
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [src]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center bg-theme-base/10`}>
        <div className="w-3 h-3 border border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blobUrl) {
    return (
      <div className={`${className} flex items-center justify-center bg-theme-base text-theme-muted`}>
        <ImageIcon size={14} />
      </div>
    );
  }

  return <img src={blobUrl} alt={alt} className={className} />;
};
export default ProtectedImage;
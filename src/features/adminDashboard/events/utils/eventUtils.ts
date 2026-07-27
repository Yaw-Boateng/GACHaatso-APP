import { IMAGE_BASE_URL } from "../../../../services/apiClient";

export const getFullImageUrl = (url?: string): string => {
  if (!url) return '';

  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }

  const cleanBase = IMAGE_BASE_URL.endsWith('/') ? IMAGE_BASE_URL.slice(0, -1) : IMAGE_BASE_URL;
  const cleanAssetPath = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;

  return `${cleanBase}${cleanAssetPath}`;
};
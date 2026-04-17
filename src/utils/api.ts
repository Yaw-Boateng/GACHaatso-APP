// src/utils/api.ts
export const authenticatedFetch = async (url: string, options: any = {}) => {
  const user = JSON.parse(localStorage.getItem('gac_user') || '{}');
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`, // Attach token automatically
  };

  return fetch(url, { ...options, headers });
};
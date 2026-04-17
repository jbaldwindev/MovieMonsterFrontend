const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const apiOrigin = process.env.REACT_APP_API_ORIGIN?.trim();

export const API_ORIGIN = apiOrigin ? trimTrailingSlash(apiOrigin) : "";
export const API_BASE_URL = API_ORIGIN ? `${API_ORIGIN}/api` : "/api";

export const buildApiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const buildAssetUrl = (path = "") => {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("blob:") || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return API_ORIGIN ? `${API_ORIGIN}${normalizedPath}` : normalizedPath;
};

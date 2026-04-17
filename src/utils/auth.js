export const extractAuthenticatedUsername = (payload) => {
  if (!payload) {
    return null;
  }

  if (typeof payload === "string") {
    const normalized = payload.trim();
    return normalized.length > 0 ? normalized : null;
  }

  if (typeof payload === "object") {
    const username = payload.username;

    if (typeof username === "string" && username.trim().length > 0) {
      return username.trim();
    }
  }

  return null;
};

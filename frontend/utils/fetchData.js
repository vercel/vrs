export async function fetchData(path) {
  function getBaseUrl() {
    if (typeof window === "undefined") {
      return process.env.NODE_ENV === "production" ? `https://${req.headers.host}` : `https://localhost:3000`;
    }

    return `/`
  }

  const response = await fetch(`${getBaseUrl()}${path}`);
  const { docs } = await response.json();

  return docs;
}
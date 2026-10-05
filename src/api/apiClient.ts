type QueryParams = Record<string, string | number | boolean | undefined>;

export const apiClient = {
  async request<T>(url: string, params?: QueryParams): Promise<T> {
    const requestUrl = new URL(url, window.location.origin);

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== undefined) {
        requestUrl.searchParams.set(key, String(value));
      }
    });

    const response = await fetch(requestUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }

    return response.json() as Promise<T>;
  },
};

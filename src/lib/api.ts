/**
 * Base URL for API requests. Set in .env as VITE_API_URL.
 * - Dev with Vite proxy: use "" or omit so /api hits the proxy.
 * - Production: set to your backend origin (e.g. https://api.yourapp.com).
 */
export const API_BASE = import.meta.env.VITE_API_URL ?? "";

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(apiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });
}

export function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

import { MailzeetError } from "../errors/MailZeetErrors";


/**
 * Generic HTTP client for Mailzeet API
 * Uses native fetch (Node 18+, Bun, Deno)
 *
 * @template T
 * @param url - API endpoint
 * @param options - Fetch options
 * @returns Parsed JSON response
 * @throws Error when response is not OK
 */
export async function http<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);
  
  if (!response.ok) {
    throw new MailzeetError(
      data?.message ?? response.statusText,
      data.status,
      data
    );
  }
  return data as T;
}

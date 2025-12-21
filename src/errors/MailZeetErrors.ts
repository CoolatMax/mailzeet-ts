/**
 * Custom error thrown by Mailzeet SDK
 */
export class MailZeetError extends Error {
  /** HTTP status code */
  public readonly status: number;

  /** Raw API response */
  public readonly data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "MailzeetError";
    this.status = status;
    this.data = data;
  }
}

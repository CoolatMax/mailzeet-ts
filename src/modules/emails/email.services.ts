import { http } from "../../client/http";
import { SendEmailPayload } from "./emails.types";

/**
 * Emails API module
 */
export class EmailsService {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string
  ) {}

  /**
   * Send a transactional email
   *
   * @param payload - Email content and metadata
   */
  async send(payload: SendEmailPayload) {
    return http(`${this.baseUrl}/mails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  }
}

import { http } from "../../client/http";
import { SendEmailInput } from "./emails.input";
import { parseSendEmailInput } from "./emails.parser";
import { SendEmailResponse } from "./emails.types";

/**
 * Emails API module
 */
export class EmailsService {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl?: string
  ) {
    this.baseUrl = "https://api.mailzeet.com/v1";
  }

  /**
   * Send a transactional email
   *
   * @param input - Email content and metadata
   */
  async send(input: SendEmailInput): Promise<SendEmailResponse> {
    const payload = parseSendEmailInput(input);
    return http(`${this.baseUrl}/mails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
}

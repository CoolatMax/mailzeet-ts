import { http } from "../../client/http";
import type { SendEmailInput } from "./emails.input"; // Added 'type' 
import { parseSendEmailInput } from "./emails.parser";
import type { SendEmailResponse } from "./emails.types"; // Added 'type'

/**
 * Emails API module
 */
export class EmailsService {
  
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || "https://api.mailzeet.com/v1";
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

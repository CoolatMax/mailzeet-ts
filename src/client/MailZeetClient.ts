import { EmailsService } from "../modules/emails/email.services";


/**
 * Mailzeet main client
 *
 * @example
 * ```ts
 * const mailzeet = new MailzeetClient({ apiKey: "key" });
 * await mailzeet.emails.send({...});
 * ```
 */
export class MailzeetClient {
  public readonly emails: EmailsService;

  constructor(config: { apiKey: string; baseUrl?: string }) {
    const baseUrl = config.baseUrl ?? "https://api.mailzeet.com/v1";

    this.emails = new EmailsService(config.apiKey, baseUrl);
  }
}

import { EmailsService } from "../modules/emails/emails.services";

/**
 * Mailzeet main client
 *
 * @example
 * ```ts
 * const mailzeet = new MailZeetClient("YOUR_API_KEY");
 * await mailzeet.emails.send({
  from: "hello@acme.com", // Sender email
  to: "user@gmail.com", // Recipient email
  cc: "cc@example.com", // Optional CC
  bcc: "bcc@example.com", // Optional BCC
  replyTo: "replyto@example.com", // Optional reply-to
  subject: "Welcome",
  text: "Hello world", // Optional plain text
  html: "<h1>Hello world</h1>", // Optional HTML
  params: { company: "Acme" }, // Dynamic template params
});
 */
export class MailZeetClient {
  public readonly emails: EmailsService;

  private static readonly BASE_URL = "https://api.mailzeet.com/v1";

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Mailzeet API key is required");
    }

    this.emails = new EmailsService(apiKey, MailZeetClient.BASE_URL);
  }
}

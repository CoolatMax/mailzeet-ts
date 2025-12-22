export * from "./client/MailZeetClient";
export * from "./errors/MailZeetErrors";

export type {
  MailzeetSender,
  MailzeetRecipient,
  MailzeetReplyTo,
  SendEmailPayload,
  SendEmailResponse,
} from "./modules/emails/emails.types";

export type { SendEmailInput } from "./modules/emails/emails.input";

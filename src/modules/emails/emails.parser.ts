// src/modules/emails/emails.parser.ts

import type { SendEmailInput } from "./emails.input"; // Added 'type'
import type { MailzeetRecipient, SendEmailPayload } from "./emails.types"; // Added 'type'

function normalizeRecipient(
  value: string | { email: string; name?: string }
): MailzeetRecipient {
  return typeof value === "string" ? { email: value } : value;
}

function normalizeRecipients(value: SendEmailInput["to"]): MailzeetRecipient[] {
  if (Array.isArray(value)) {
    return value.map(normalizeRecipient);
  }
  return [normalizeRecipient(value)];
}

export function parseSendEmailInput(input: SendEmailInput): SendEmailPayload {
  return {
    sender: input.from
      ? typeof input.from === "string"
        ? { email: input.from }
        : input.from
      : undefined,

    recipients: normalizeRecipients(input.to),

    cc: input.cc?.map(normalizeRecipient),
    bcc: input.bcc?.map(normalizeRecipient),

    "reply_to.email": input.replyTo
      ? typeof input.replyTo === "string"
        ? { email: input.replyTo }
        : input.replyTo
      : undefined,

    subject: input.subject,
    text: input.text,
    html: input.html,
    template_id: input.templateId,
    params: input.params,
  };
}


/**
 * Pretty input types received from the client and used to be parrsed into payloads
 */
export interface SendEmailInput {
  from?: string | { email: string; name?: string };
  to:
    | string
    | { email: string; name?: string }
    | Array<string | { email: string; name?: string }>;

  cc?: Array<string | { email: string; name?: string }>;
  bcc?: Array<string | { email: string; name?: string }>;

  replyTo?: string | { email: string; name?: string };

  subject?: string;
  text?: string;
  html?: string;
  templateId?: string;

  params?: Record<string, string | number>;
}

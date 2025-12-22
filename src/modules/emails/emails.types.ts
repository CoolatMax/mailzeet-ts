/**
 * Email sender
 */
export interface MailzeetSender {
  email: string;
  name?: string;
}

/**
 * Email success/error response from Mailzeet API
 */
export interface SendEmailResponse {
  success: boolean;
  message: string;
  data: {
    sendingId: string;
  };
}

/**
 * Email recipient (also used for CC and BCC)
 */
export interface MailzeetRecipient {
  email: string;
  name?: string;
}

/**
 * Reply-to object
 */
export interface MailzeetReplyTo {
  email: string;
  name?: string;
}

/**
 * Payload for sending an email via Mailzeet API
 */
export interface SendEmailPayload {
  sender?: MailzeetSender;
  recipients: MailzeetRecipient[];
  cc?: MailzeetRecipient[];
  bcc?: MailzeetRecipient[];
  "reply_to.email"?: MailzeetReplyTo;

  subject?: string;
  text?: string;
  html?: string;
  template_id?: string;

  /**
   * Dynamic template params
   */
  params?: Record<string, string | number>;
}

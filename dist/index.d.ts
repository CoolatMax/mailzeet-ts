/**
 * Email sender
 */
interface MailzeetSender {
    email: string;
    name?: string;
}
/**
 * Email recipient (also used for CC and BCC)
 */
interface MailzeetRecipient {
    email: string;
    name?: string;
}
/**
 * Reply-to object
 */
interface MailzeetReplyTo {
    email: string;
    name?: string;
}
/**
 * Payload for sending an email via Mailzeet API
 */
interface SendEmailPayload {
    sender?: MailzeetSender;
    recipients: MailzeetRecipient[];
    cc?: MailzeetRecipient[];
    bcc?: MailzeetRecipient[];
    reply_to?: MailzeetReplyTo;
    subject?: string;
    text?: string;
    html?: string;
    template_id?: string;
    /**
     * Dynamic template params
     */
    params?: Record<string, string | number>;
}

/**
 * Emails API module
 */
declare class EmailsService {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, baseUrl: string);
    /**
     * Send a transactional email
     *
     * @param payload - Email content and metadata
     */
    send(payload: SendEmailPayload): Promise<unknown>;
}

/**
 * Mailzeet main client
 *
 * @example
 * ```ts
 * const mailzeet = new MailzeetClient({ apiKey: "key" });
 * await mailzeet.emails.send({...});
 * ```
 */
declare class MailzeetClient {
    readonly emails: EmailsService;
    constructor(config: {
        apiKey: string;
        baseUrl?: string;
    });
}

/**
 * Custom error thrown by Mailzeet SDK
 */
declare class MailZeetError extends Error {
    /** HTTP status code */
    readonly status: number;
    /** Raw API response */
    readonly data?: unknown;
    constructor(message: string, status: number, data?: unknown);
}

export { MailZeetError, MailzeetClient };

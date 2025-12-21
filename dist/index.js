// src/errors/MailZeetErrors.ts
var MailZeetError = class extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "MailzeetError";
    this.status = status;
    this.data = data;
  }
};

// src/client/http.ts
async function http(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new MailZeetError(
      data?.message ?? response.statusText,
      data.status,
      data
    );
  }
  return data;
}

// src/modules/emails/email.services.ts
var EmailsService = class {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  /**
   * Send a transactional email
   *
   * @param payload - Email content and metadata
   */
  async send(payload) {
    return http(`${this.baseUrl}/mails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  }
};

// src/client/MailZeetClient.ts
var MailzeetClient = class {
  constructor(config) {
    const baseUrl = config.baseUrl ?? "https://api.mailzeet.com/v1";
    this.emails = new EmailsService(config.apiKey, baseUrl);
  }
};
export {
  MailZeetError,
  MailzeetClient
};

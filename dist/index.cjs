"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MailZeetError: () => MailZeetError,
  MailzeetClient: () => MailzeetClient
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailZeetError,
  MailzeetClient
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailsService } from "../src/modules/emails/emails.services";
import { MailZeetError, SendEmailPayload } from "../src";
import { SendEmailInput } from "../src/modules/emails/emails.input";

describe("EmailsService", () => {
  const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";

  beforeEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("should send an email successfully", async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Email queued",
        data: { sendingId: "afaf2u8k1c8i" },
      }),
    });

    const emails = new EmailsService(apiKey);

    const payload: SendEmailInput = {
      from: { email: "hello@mailzeet.com", name: "Mailzeet" },
      to: [{ email: "john@mailzeet.com", name: "John Doe" }],
      subject: "Hello",
      html: "<b>Hello</b>",
    };

    const response = await emails.send(payload);

    expect(globalThis.fetch).toHaveBeenCalledOnce();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/mails"),
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      })
    );

    expect(response.data.sendingId).toBeDefined();
  });

  it("should throw MailzeetError when API fails", async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Invalid API key" }),
    });

    const emails = new EmailsService(apiKey);

    await expect(
      emails.send({
        to: [{ email: "test@mail.com" }],
        subject: "Fail",
        text: "Fail",
      })
    ).rejects.toBeInstanceOf(MailZeetError);
  });
});

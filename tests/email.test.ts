import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailsService } from "../src/modules/emails/email.services";
import { MailZeetError } from "../src/errors/MailZeetErrors";

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
        message: "Email has been queued successfully and will be sent shortly.",
        data: {
          sendingId: "afaf2u8k1c8i",
        },
      }),
    });

    const emails = new EmailsService(apiKey);

    const response = await emails.send({
      sender: {
        email: "hello",
        name: "Mailzeet",
      },
      recipients: [
        {
          email: "john@mailzeet.com",
          name: "John Doe",
        },
      ],
      subject: "Hello from Mailzeet",
      text: "Hello world",
      html: "<b>Hello world</b>",
      params: {
        company: "Mailzeet",
      },
    });

    expect(globalThis.fetch).toHaveBeenCalledOnce();
    expect(response).toEqual({
      success: true,
      message: "Email has been queued successfully and will be sent shortly.",
      data: {
        sendingId: "afaf2u8k1c8i",
      },
    });
  });

  it("should throw MailZeetError when API fails", async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({
        message: "Invalid API key",
      }),
    });

    const emails = new EmailsService(apiKey);

    await expect(
      emails.send({
        sender: {
          email: "princeekpinse97@gmail.com",
          name: "Mailzeet",
        },
        recipients: [
          {
            email: "princeekpinse97@gmail.com",
            name: "John Doe",
          },
        ],
        subject: "Fail case",
        text: "Fail",
      })
    ).rejects.toBeInstanceOf(MailZeetError);
  });
});

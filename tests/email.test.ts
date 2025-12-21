import { describe, it, expect, vi, beforeEach } from "vitest";import { EmailsService } from "../src/modules/emails/email.services";
import { MailzeetError } from "../dist";
;

describe("EmailsService", () => {
  const apiKey = "lz97im6jqpf8:01KD1268HXFEHZR5EJA6J0HQNB";
  const baseUrl = "https://api.mailzeet.com/v1";

  beforeEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("should send an email successfully", async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message_id: "msg_123"
      })
    });

    const emails = new EmailsService(apiKey, baseUrl);

    const response = await emails.send({
      sender: {
        email: "hello@mailzeet.com",
        name: "Mailzeet"
      },
      recipients: [
        {
          email: "john@mailzeet.com",
          name: "John Doe"
        }
      ],
      subject: "Hello from Mailzeet",
      text: "Hello world",
      html: "<b>Hello world</b>",
      params: {
        company: "Mailzeet"
      }
    });

    expect(globalThis.fetch).toHaveBeenCalledOnce();
    expect(response).toEqual({
      success: true,
      message_id: "msg_123"
    });
  });

  it("should throw MailzeetError when API fails", async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({
        message: "Invalid API key"
      })
    });

    const emails = new EmailsService(apiKey, baseUrl);

    await expect(
      emails.send({
        sender: {
          email: "hello@mailzeet.com",
          name: "Mailzeet"
        },
        recipients: [
          {
            email: "john@mailzeet.com",
            name: "John Doe"
          }
        ],
        subject: "Fail case",
        text: "Fail"
      })
    ).rejects.toBeInstanceOf(MailzeetError);
  });
});

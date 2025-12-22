import { MailZeetClient, type SendEmailInput } from "../../src/index.js";

// Safe DOM helpers
const form = document.getElementById("email-form") as HTMLFormElement | null;
const toInput = document.getElementById("to") as HTMLInputElement | null;
const ccInput = document.getElementById("Cc") as HTMLInputElement | null;
const bccInput = document.getElementById("Bcc") as HTMLInputElement | null;
const replyToInput = document.getElementById(
  "replyTo"
) as HTMLInputElement | null;
const subjectInput = document.getElementById(
  "subject"
) as HTMLInputElement | null;
const templateIdInput = document.getElementById(
  "template_id"
) as HTMLInputElement | null;
const textInput = document.getElementById("text") as HTMLInputElement | null;
const htmlInput = document.getElementById(
  "content"
) as HTMLTextAreaElement | null;
const result = document.getElementById("result") as HTMLPreElement | null;

if (
  !form ||
  !toInput ||
  !ccInput ||
  !bccInput ||
  !replyToInput ||
  !subjectInput ||
  !templateIdInput ||
  !textInput ||
  !htmlInput ||
  !result
) {
  throw new Error("Required DOM elements not found");
}

// Load default values from env
toInput.value = import.meta.env.VITE_DEFAULT_TO || "";
ccInput.value = import.meta.env.VITE_DEFAULT_CC || "";
bccInput.value = import.meta.env.VITE_DEFAULT_BCC || "";
replyToInput.value = import.meta.env.VITE_DEFAULT_REPLYTO || "";
subjectInput.value = import.meta.env.VITE_DEFAULT_SUBJECT || "";
templateIdInput.value = import.meta.env.VITE_DEFAULT_TEMPLATE_ID || "";
textInput.value = import.meta.env.VITE_DEFAULT_TEXT || "";
htmlInput.value = import.meta.env.VITE_DEFAULT_HTML || "";

form.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();

  const apiKey = import.meta.env.VITE_MAILZEET_API_KEY;

  const mailzeet = new MailZeetClient(apiKey);
  result.textContent = "Sending…";

  const parseEmails = (input: string | null) =>
    input && input.trim()
      ? input.split(",").map((email) => ({ email: email.trim() }))
      : [];

  const payload: SendEmailInput = {
    from: { email: "hello@mailzeet.com", name: "MailZeet" },
    to: parseEmails(toInput.value),
    cc: parseEmails(ccInput.value),
    bcc: parseEmails(bccInput.value),
    replyTo: replyToInput.value ? { email: replyToInput.value } : undefined,
    subject: subjectInput.value || undefined,
    text: textInput.value || undefined,
    html: htmlInput.value || undefined,
    templateId: templateIdInput.value || undefined,
    params: {
      company: "MailZeet",
    },
  };

  try {
    const response = await mailzeet.emails.send(payload);
    result.textContent = JSON.stringify(response, null, 2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      result.textContent = error.message;
    } else {
      result.textContent = "Unknown error occurred";
    }
  }
});

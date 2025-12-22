# Mailzeet TypeScript SDK

**Community-driven TypeScript SDK** for the **Mailzeet API**.  
Send transactional emails easily using TypeScript or JavaScript with type safety and minimal setup.

---

## Features

- TypeScript first (full typings included)
- Modular API (`emails`, `templates`, future modules)
- Native `fetch` based HTTP client
- Zero external runtime dependencies
- Simplified payloads (`from`/`to`, etc...) with automatic parsing
- Alpha status — API may change

## Installation

You can install using **npm**, **yarn**, **bun**, or directly via **CDN**.

### Using npm

```bash
npm install mailzeet-ts
```

### Using yarn

```bash
yarn add mailzeet-ts
```

### Using bun

```bash
bun add mailzeet-ts
```

### Using a CDN (for browser)

```html
<script type="module">
  import { MailzeetClient } from "https://cdn.jsdelivr.net/npm/mailzeet-ts/dist/index.js";
</script>
```

---

## Usage

### Node.js / TypeScript

```ts
import { MailzeetClient } from "mailzeet-ts";

const apiKey = process.env.MAILZEET_API_KEY!;

// Initialize client
const mailzeet = new MailzeetClient(apiKey);

// Send an email
await mailzeet.emails.send({
  from: "hello@acme.com",
  to: "user@gmail.com",
  subject: "Welcome",
  html: "<h1>Hello</h1>",
});
```

### Browser / Frontend

```ts
import { MailzeetClient } from "mailzeet-ts";

const mailzeet = new MailzeetClient("YOUR_API_KEY_HERE");

document.getElementById("email-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const to = (document.getElementById("to") as HTMLInputElement).value;
  const subject = (document.getElementById("subject") as HTMLInputElement)
    .value;
  const html = (document.getElementById("html") as HTMLTextAreaElement).value;
  const result = document.getElementById("result") as HTMLPreElement;

  try {
    const response = await mailzeet.emails.send({
      from: "hello@acme.com",
      to,
      subject,
      html,
    });
    result.textContent = JSON.stringify(response, null, 2);
  } catch (err: unknown) {
    result.textContent = err instanceof Error ? err.message : "Unknown error";
  }
});
```

## Payloads

You can send emails using a **simplified payload**:

```ts
await mailzeet.emails.send({
  from: "hello@acme.com", // Sender email
  to: "user@gmail.com", // Recipient email (or array of emails)
  cc: "cc@example.com", // Optional CC
  bcc: "bcc@example.com", // Optional BCC
  replyTo: "replyto@example.com", // Optional reply-to
  subject: "Welcome",
  text: "Hello world", // Optio{
  from: "hello@acme.com", // Sender email
  to: "user@gmail.com", // Recipient email (or array of emails)
  cc: "cc@example.com", // Optional CC
  bcc: "bcc@example.com", // Optional BCC
  replyTo: "replyto@example.com", // Optional reply-to
  subject: "Welcome",
  text: "Hello world", // Optional plain text
  html: "<h1>Hello world</h1>", // Optional HTML
  params: { company: "Acme" }, // Dynamic template params
});
```

The SDK **automatically converts** `from` and `to` into the format expected by the Mailzeet API (`sender`, `recipients`).

## Contributing

We welcome contributions!
Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

> Make sure to follow TypeScript typings and write tests using Vitest.

## License

[MIT Licence](LICENCE)

## Links

- [GitHub](https://github.com/prince0xdev/mailzeet-ts)
- [NPM Package](https://www.npmjs.com/package/mailzeet-ts)

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

### Using a CDN (for browser and recommand for dev mode only)

```html
<script type="module">
  import { MailzeetClient } from "https://cdn.jsdelivr.net/npm/mailzeet-ts/dist/index.js";
</script>
```

---

## Usage

### Node.js / TypeScript

```ts
import { MailZeetClient, MailZeetError } from "mailzeet-ts";

const mailzeet = new MailZeetClient("your_api_key");

try {
  const response = await mailzeet.emails.send({
    from: { email: "hello@acme.com", name: "Acme Team" }, // Object style
    to: ["user1@gmail.com", "user2@gmail.com"],         // Array support
    subject: "Monthly Report",
    templateId: "report-template-123",
    params: {
      month: "January",
      year: 2026
    }
  });
  console.log("Sent successfully:", response.data.sendingId);
} catch (err) {
  if (err instanceof MailZeetError) {
    console.error(`API Error (${err.status}): ${err.message}`);
  }
}
```
### Configuation Reference

|Option	| Type	| Required	| Description |
|-------|-------|-----------|-------------|
|`from`	| `string/ Object`	| No |	Sender email and optional name. |
|`to` | `string/ Array`	| Yes	| One or more recipient emails. |
|`cc / bcc` |	`Array `|	No	|List of carbon copy recipients. |
|`templateId`	| `string`	| No	| ID of a pre-defined Mailzeet template. |
|`params`	| `Object` | No	| Dynamic data for template placeholders. |

### Browser (Node.js / TypeScript)
For server-side environments, use environment variables to secure your API key.
```ts
import { MailZeetClient, MailZeetError } from "mailzeet-ts";

const mailzeet = new MailZeetClient(process.env.MAILZEET_API_KEY!);

async function sendWelcomeEmail() {
  try {
    const response = await mailzeet.emails.send({
      from: { email: "sales@acme.com", name: "Acme Corp" },
      to: "customer@gmail.com",
      subject: "Your Order is Confirmed",
      templateId: "welcome-email-v1",
      params: {
        customerName: "John Doe",
        orderId: 12345
      }
    });
    console.log("Email Sent! ID:", response.data.sendingId);
  } catch (err) {
    if (err instanceof MailZeetError) {
      console.error(`Mailzeet Error [${err.status}]: ${err.message}`);
    }
  }
}
```
### Frontend (Browser / Vite)
When using in the frontend, ensure you are using the modular exports for smaller bundle sizes. 

> **Note**: Be careful not to expose your Secret API key in client-side code in production; use a proxy or backend wrapper for production apps.

```ts
import { MailZeetClient } from "mailzeet-ts";

const mailzeet = new MailZeetClient("public_key_here");

const handleFormSubmit = async (formData) => {
  const { data, success } = await mailzeet.emails.send({
    from: "noreply@acme.com",
    to: formData.email,
    subject: "Newsletter Signup",
    html: `<p>Thanks for joining!</p>`
  });

  if (success) {
    alert(`Success! Tracking ID: ${data.sendingId}`);
  }
};
```

## Payloads

You can send emails using a **simplified payload**:

```ts
await mailzeet.emails.send({
  from: "hello@acme.com", // Sender email
  to: "user@gmail.com", // Recipient email
  cc: "cc@example.com", // Optional CC
  bcc: "bcc@example.com", // Optional BCC
  replyTo: "replyto@example.com", // Optional reply-to
  subject: "Welcome", 
  temlateId: "idhFGDhlxxhd",
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
4. Don't forget reading the [contributions guidelines](CONTRIBUTING.md)

> Make sure to follow TypeScript typings and write tests using Vitest.

## License

[MIT Licence](LICENCE.md)


## Changelog

[CHANGELOG](CHANGELOG.md)

## Links

- [GitHub](https://github.com/prince0xdev/mailzeet-ts)
- [NPM Package](https://www.npmjs.com/package/mailzeet-ts)

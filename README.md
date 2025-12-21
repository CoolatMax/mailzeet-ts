# Mailzeet TypeScript SDK

Community-driven TypeScript SDK for the Mailzeet API.

## Installation

```bash
npm install mailzeet-typescript
````

## Usage

```ts
import { MailzeetClient } from "mailzeet-typescript";

const mailzeet = new MailzeetClient({
  apiKey: process.env.MAILZEET_API_KEY!
});

await mailzeet.emails.send({
  from: "hello@acme.com",
  to: "user@gmail.com",
  subject: "Welcome",
  html: "<h1>Hello</h1>"
});
```

## Features

* TypeScript first
* Native fetch
* Modular API
* Zero external runtime dependencies

## Status

Alpha — API may change.

## Contributing

PRs welcome.

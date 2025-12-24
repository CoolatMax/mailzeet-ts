# Contributing to Mailzeet TypeScript SDK

Thank you for your interest in contributing to **Mailzeet TypeScript SDK**
This project is **community-driven**, beginner-friendly, and focused on **clean DX and correctness**.

Whether you want to fix a typo, improve types, add features, or learn by contributing — you’re welcome.

---

## Project philosophy

This SDK follows a few core principles:

* **TypeScript first** (strong typing, good autocomplete)
* **Simple API for users**, even if the internal API is more complex
* **No unnecessary dependencies**
* **Beginner-friendly codebase**
* **Readable > clever**
* **Community-driven**, not corporate

If your contribution aligns with these values, it’s likely welcome.

---

## Project structure

```txt
mailzeet-ts/
├── src/
│   ├── client/          # HTTP client (fetch wrapper)
│   ├── modules/
│   │   └── emails/      # Emails service (send, types, parsing)
│   ├── errors/          # Custom SDK errors
│   └── index.ts         # Public exports
│
├── tests/               # Vitest tests
├── example/            # Vite dev example (HTML + TS)
├── dist/                # Build output (generated)
├── README.md
├── CONTRIBUTING.md
└── CHANGELOG.md
```

---

## What you can contribute

You can help in many ways:

### Code

* Improve TypeScript types
* Add new API features (emails, templates, logs, etc.)
* Improve error handling
* Refactor internal code for clarity
* Improve parsing between **user-friendly input** and **Mailzeet API payload**

### Tests

* Add or improve **Vitest** tests
* Cover edge cases
* Improve type-safety in tests

### Documentation

* Improve README
* Add examples
* Fix typos or unclear explanations

### DX & Tooling

* Improve build setup
* Improve example app
* Improve developer experience

---

## Development setup

### 1. Fork & clone

```bash
git clone https://github.com/YOUR_USERNAME/mailzeet-ts.git
cd mailzeet-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project in dev mode

```bash
npm run dev
```

### 4. Run tests

```bash
npm run test
```

---

## Running the example app (important)

The SDK includes a **Vite-based example app** for local testing.

```bash
cd examples
npm install
npm run dev
```

Create a `.env` file in the example folder:

```env
VITE_MAILZEET_API_KEY=your_api_key_here
```

This example is used to:

* Validate real SDK usage
* Test DX
* Catch breaking changes early

If you change SDK behavior, **always test the example app**.

---

## API design rules (very important)

### 1. User-facing API must stay simple

Users should be able to write:

```ts
await mailzeet.emails.send({
  from: "hello@acme.com",
  to: "user@gmail.com",
  subject: "Welcome",
  html: "<h1>Hello</h1>"
});
```

Even if internally the API requires:

```ts
sender
recipients[]
reply_to
cc
bcc
```

👉 **Parsing complexity belongs inside the SDK, not to the user.**

---

### 2. Do NOT expose internal API constraints to users

Bad ❌:

```ts
recipients: [{ email: string }]
```

Good ✅:

```ts
to: "user@gmail.com"
to: ["a@mail.com", "b@mail.com"]
```

---

### 3. Types must guide the user

* Prefer **clear types**
* Avoid `any`
* Use `unknown` when necessary
* Narrow types properly

If TypeScript autocomplete feels bad → it’s a bug.

---

## Error handling rules

* Always throw **MailZeetError**
* Never throw raw `fetch` or `Error`
* Errors must include:

  * message
  * statusCode (if available)

Example:

```ts
throw new MailZeetError("Invalid API key", 401);
```

---

## Testing rules

* All new features must include tests
* Tests use **Vitest**
* Mock `fetch` using `vi.fn()`
* Prefer behavior tests over implementation tests

Good test example:

```ts
expect(response.data.sendingId).toBeDefined();
```

Not recommended:

```ts
expect(fetch).toHaveBeenCalledWith(EXACT_OBJECT);
```

---

## Commit guidelines

Use clear, simple commit messages:

```txt
feat: add user-friendly email input parsing
fix: correct MailZeetError name
test: improve EmailsService tests
docs: improve contributing guide
```

---

## Pull request checklist

Before opening a PR, make sure:

* [ ] Code builds (`npm run build`)
* [ ] Tests pass (`npm run test`)
* [ ] Example app works
* [ ] Types are correct
* [ ] No breaking change without discussion
* [ ] Code is readable

---

## Beginner-friendly note

This project **welcomes junior developers**.

You don’t need to be perfect.
You don’t need to know everything.
You just need to:

* Ask questions
* Be respectful
* Be willing to learn

If something is unclear, open an issue.

---

## Communication

* Open an **Issue** for bugs, ideas, or questions
* Open a **Draft PR** if you’re unsure
* Discussions are welcome

---

## License

By contributing, you agree that your contributions will be licensed under the **MIT License**.

---

Thank you for contributing 💙
This SDK exists because of the community.

— **Mailzeet TypeScript SDK Community**
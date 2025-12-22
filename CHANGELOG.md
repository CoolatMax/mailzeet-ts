# Changelog for Mailzeet TypeScript SDK

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.0] - 2025-12-22

### Added
- Added `MailZeetClient` as the main entry point for the SDK.
- Created `EmailsService` module to handle email sending.
- Added `SendEmailPayload` and related types (`MailzeetSender`, `MailzeetRecipient`, `MailzeetReplyTo`) for strongly typed email payloads.
- Supported dynamic template parameters via `params` field.
- Built example HTML + TypeScript form for testing email sending.
- Added `Vitest` tests for `EmailsService` including successful send and error handling.
- Default `baseUrl` set internally in `MailZeetClient` so developers do not need to specify the API URL.
- Added zero-runtime-dependency, TypeScript-first SDK design.
- Exposed CDN installation and support for multiple package managers (npm, yarn, bun).

### Changed
- Updated `EmailsService` to parse user-friendly payloads into the format required by the Mailzeet API.
- Refactored tests to use `SendEmailPayload` and mock `fetch` calls.
- Simplified client initialization so API key is the only required config.

### Fixed
- Corrected TypeScript type exports for payloads.
- Fixed `MailZeetError` handling in tests.
- Ensured form submission prevents default behavior in example HTML/TS setup.
- Corrected environment variable usage for Vite (`VITE_MAILZEET_API_KEY`) in example.

## [0.1.0-alpha.0] - 2025-12-21
### Added
- First alpha release of `mailzeet-ts` published to npm.
- Basic email sending with `MailZeetClient` and `EmailsService`.
- Vitest test suite for `EmailsService`.
- Example usage of SDK in TypeScript + HTML environment.

### Known issues
- Some type inference in `SendEmailPayload` could be improved.
- API responses typed as `unknown` in tests initially; later fixed.
- Example app requires Vite or similar bundler to inject environment variables.

## [0.0.1] - Initial development
- Started project structure with `src` modules.
- Added basic TypeScript scaffolding.
- Added initial SDK structure and types.
- Added `tsup` build configuration.

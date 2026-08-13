# M7 CRM Integration Foundation — QA Record

## Scope

M7 establishes a provider-independent, server-only lead submission boundary for
the residential estimate, commercial estimate, and general contact forms. Live
CRM and SMS delivery remain disabled.

## Safety behavior

| State                                 | External request        | Visitor confirmation                        |
| ------------------------------------- | ----------------------- | ------------------------------------------- |
| Activation gate off                   | None                    | No receipt claim                            |
| Partial or invalid configuration      | None                    | No receipt claim                            |
| Valid HTTPS configuration and gate on | One server-side request | Success only after a confirmed 2xx response |
| Provider/network failure              | Attempt fails safely    | No receipt claim                            |

`CRM_SUBMISSION_ENABLED=false` is the committed default. Webhook URLs are
server-side environment values, are never returned to the client, and are
redacted in diagnostics. Invalid form data and honeypot submissions are rejected
before the CRM adapter can make a request.

## Evidence

- Provider-independent types, mapping, routing, logging, configuration, and HTTP client live in `lib/integrations/crm/`.
- Client forms call narrow `use server` actions; CRM implementation modules are not imported into the browser boundary.
- Automated M7 coverage verifies disabled, misconfigured, validation, spam, network failure, redaction, routing, and confirmed-success behavior.
- SMS consent and SMS delivery are not present or activated.

## Approval-dependent activation items

1. Verify the exact CRM project/sub-account and HTTPS webhook endpoints.
2. Confirm residential, commercial, and general lead routing.
3. Approve privacy-policy language for CRM data processing.
4. Configure preview-only secrets and run an authorized non-production test lead.
5. Set `CRM_SUBMISSION_ENABLED=true` only after the preceding checks pass.

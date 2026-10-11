# Local-First And Optional-AI Messaging Proposal

Date: 2026-10-11
Status: Applied locally after the owner's instruction to prioritize images, navigation, and landing-page text changes. Final visual review pending. No merge, push, or deployment authorized.

## Overview Hero

Retain the headline:

**Your life is personal. Your technology should respect that.**

Replace the first supporting paragraph with:

We believe powerful software shouldn't require you to hand over your personal information.

Replace the company-positioning paragraph with:

Amanchi Labs builds intelligent, local-first applications. Our design goal is to store and process your personal information on your device, without requiring you to upload your personal documents to Amanchi Labs servers.

Keep the existing philosophy CTA and brand signature. Do not add another large hero block. Introduce the short positioning line in Our Approach:

**Local-first by design. AI-enabled by choice.**

## Our Approach

Retain the local-processing and user-control entries. Replace the current AI entry with:

**AI on your terms.**

AI can make personal applications more useful without needing your entire personal history. We design external AI integrations to be optional and initiated by you, with clear information about what is sent and why.

The intended model is a request from your app to the AI provider used by that integration, without routing personal request content through Amanchi Labs servers. Your app may prepare and send the request and display the response. External providers may process or retain submitted information under their own terms and privacy policies.

Your information stays yours. AI remains your choice.

This is a replacement within the existing section, not a new panel or duplicate of the Principles content. Paragraphs must remain readable on mobile; recheck hero visibility and section heights after approval.

## Architecture Explanation

Keep the normal local workflow and dashed optional external path. Rename the optional stage to **External AI provider**, with **Optional integration** and **Information you authorize** as supporting labels.

Proposed caption:

Our intended architecture keeps your application and personal information on your device. When you initiate an optional external AI request, your app sends the information needed for that request to the provider used by the integration. We aim to keep personal AI-request content out of Amanchi Labs servers.

The provider may process or retain submitted information under its own policies. Your app still handles the request and response; server non-involvement does not mean Amanchi Labs software is uninvolved.

Illustrative design philosophy. Storage, available providers, consent, routing, backups, and telemetry vary by application and require product-specific verification.

Use this caption to distinguish three parties without adding another floating box or implying a verified direct connection in every product. Do not say "your chosen provider" until provider selection is verified.

## Principles Panel

Keep its heading, four-item layout, and editorial visual identity. Proposed replacement bodies:

1. **Private by design:** Design to store and process personal information on your device, minimizing unnecessary collection and centralized storage of personal documents.
2. **AI on your terms:** Design optional, user-initiated AI integrations that explain what is sent to the external provider. Provider policies still apply.
3. **You stay in control:** Make storage and sharing understandable, and design meaningful choices about what to retain, send, export, or remove.
4. **Made for real life:** Useful personal tools should not require unnecessary accounts or uploads. These are design goals, not universal product guarantees.

## Products And Individual Panels

Products disclosure:

Local-first by design. AI-enabled by choice. Each application is designed with privacy in mind; available integrations and data-handling practices vary by product. Explore each application to learn how it works.

WealthPrivate trust-footnote proposal:

WealthPrivate is being designed to organize financial information on your device, with optional AI integrations that aim to avoid routing personal request content through Amanchi Labs servers.

DermaPrivate trust-footnote proposal:

Our design goal is local-first routine planning with optional, user-initiated AI assistance. Information sent to an external provider is subject to its policies; integration details vary by product.

These replace stronger guarantees with explicit intentions pending implementation evidence. Keep current links, statuses, product headings, and visuals. Confirm product-specific evidence before strengthening any statement. Review descriptions/chips alongside the footnotes so an "Optional AI" label is not treated as proof of behavior.

## Claim Verification Summary

The product owner previously confirmed the earlier claims originated with the agent that built the applications and instructed us to consider that approval gate resolved. That is recorded as owner-attested evidence, not an independent audit by this website assistant. The expanded AI-routing/provider-selection claims introduce additional details not established by that statement.

| Claim | Current evidence | Wording pending evidence |
| --- | --- | --- |
| On-device personal storage/processing | Product-owner attestation about earlier app-agent requirements; actual product code not inspected here | "Our design goal" / "being designed" |
| No personal AI-request content on Amanchi Labs servers | Intended architecture supplied in this request; no request traces/backend review supplied | "We aim" / "intended model", not "we never receive" |
| User-initiated AI and consent about selected data | Owner-attested earlier optional-AI model; exact UI/payload scope not inspected | Design intention; do not promise exact selection controls |
| Users choose their provider | No verified provider list/selection UI supplied | "Provider used by the integration" |
| Provider retention/training | No provider-specific policies supplied | Providers "may process or retain" under their policies |
| Accounts, encryption, telemetry, backup, export/deletion | No independent workflow evidence supplied | No new capability/absence guarantee; intentions only where approved |

Before publication of stronger capability claims, inspect each application's source/release, local and backend storage, authentication, integration selection, consent, complete request/response path, intermediary services, telemetry/logs, backup/sync, and provider policies. Record commit/platform/workflow, evidence, exceptions, and reviewer. Do not infer "zero server storage" from a local-first label or assume application-managed AI is server-free.

## Implementation After Copy Approval

1. Apply only approved text/diagram-label changes to Overview, Principles, Products, and relevant product trust copy; preserve the existing layout and brand integration.
2. Synchronize company description, no-JavaScript summary, structured-data wording, and shared metadata only where approved copy makes them inconsistent. Keep website privacy disclosures separate from product data handling.
3. Run focused copy/CTA tests, TypeScript, existing browser regression suite, build, and desktop/mobile screenshots. Review increased text height and preserve initial hero/action visibility.
4. Return revised screenshots and evidence classifications. Do not merge, push, or deploy without explicit authorization.